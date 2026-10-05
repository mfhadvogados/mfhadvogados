import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { assets } from "@/lib/site-assets";

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <Image
        src={assets.hero}
        alt=""
        fill
        preload
        sizes="100vw"
        className="hero__image"
      />
      <div className="hero__shade" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__label">Melara, Fuhrmann & Huinka</p>
          <h1 id="hero-title">
            <span>Inteligência jurídica.</span> <span>Visão empresarial.</span>
          </h1>
          <p className="hero__description">
            Assessoria jurídica empresarial e contencioso estratégico e de
            massa. Experiência, proximidade e segurança para as decisões do seu
            negócio.
          </p>
          <a className="button button-light" href="#contato">
            Falar com o escritório <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </div>
        <div className="hero__bottom">
          <p>
            Desde 2006 <span>Florianópolis, Santa Catarina</span>
          </p>
          <a href="#escritorio" className="hero__explore">
            Conheça o MFH <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function PracticePaths() {
  return (
    <nav className="practice-paths" aria-label="Frentes de atuação">
      <div className="container practice-paths__inner">
        <a href="#atuacao">
          <span>
            <strong>Assessoria jurídica empresarial</strong>
            <small>Presença contínua. Decisões mais seguras.</small>
          </span>
          <ArrowUpRight aria-hidden="true" size={24} />
        </a>
        <a href="#contencioso">
          <span>
            <strong>Contencioso estratégico e de massa</strong>
            <small>Qualidade técnica. Eficiência operacional.</small>
          </span>
          <ArrowUpRight aria-hidden="true" size={24} />
        </a>
      </div>
    </nav>
  );
}
