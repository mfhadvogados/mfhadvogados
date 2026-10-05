import { spawn } from "node:child_process";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const environment = { ...process.env };
delete environment.NO_COLOR;

let server;
let runner;
let interrupted = false;

// Stop only the two direct children created here, without Windows taskkill.
function stopChild(child) {
  if (!child) return;
  if (child.exitCode === null && child.signalCode === null && !child.killed) {
    child.kill();
  }
  child.stdout?.destroy();
  child.stderr?.destroy();
  child.unref();
}

function cleanup() {
  stopChild(runner);
  stopChild(server);
}

for (const [signal, code] of [
  ["SIGINT", 130],
  ["SIGTERM", 143],
]) {
  process.once(signal, () => {
    interrupted = true;
    process.exitCode = code;
    cleanup();
  });
}
process.once("exit", cleanup);

function waitForReady(child) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timeout = setTimeout(() => {
      finish(
        new Error(
          "O servidor não ficou pronto em 60 segundos. Execute npm run build antes dos testes.",
        ),
      );
    }, 60_000);

    function finish(error) {
      clearTimeout(timeout);
      child.off("error", onError);
      child.off("exit", onExit);
      child.stdout.off("data", onOutput);
      child.stderr.off("data", onOutput);
      if (error) reject(error);
      else resolve();
    }

    function onOutput(chunk) {
      output = `${output}${chunk.toString()}`.slice(-16_384);
      if (/Ready in\s/i.test(output)) finish();
    }

    function onError(error) {
      finish(error);
    }

    function onExit(code, signal) {
      finish(
        new Error(
          `O servidor encerrou antes de ficar pronto (${signal ?? code}).`,
        ),
      );
    }

    child.once("error", onError);
    child.once("exit", onExit);
    child.stdout.on("data", onOutput);
    child.stderr.on("data", onOutput);
  });
}

function waitForExit(child) {
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
}

try {
  if (!environment.E2E_BASE_URL) {
    environment.E2E_BASE_URL = "http://localhost:3100";
    server = spawn(
      process.execPath,
      [
        join(projectRoot, "node_modules/next/dist/bin/next"),
        "start",
        "--port",
        "3100",
      ],
      {
        cwd: projectRoot,
        env: environment,
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"],
      },
    );
    server.stdout.pipe(process.stdout, { end: false });
    server.stderr.pipe(process.stderr, { end: false });
    await waitForReady(server);
  }

  if (!interrupted) {
    runner = spawn(
      process.execPath,
      [
        join(projectRoot, "node_modules/@playwright/test/cli.js"),
        "test",
        ...process.argv.slice(2),
      ],
      {
        cwd: projectRoot,
        env: environment,
        windowsHide: true,
        stdio: "inherit",
      },
    );
    const code = await waitForExit(runner);
    if (!interrupted) process.exitCode = code;
  }
} catch (error) {
  if (!interrupted) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
} finally {
  cleanup();
}
