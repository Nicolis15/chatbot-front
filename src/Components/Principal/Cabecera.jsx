import logoImg from '../../assets/logo.svg'; // Ajusta la ruta de tu logo
import logoPortafolio from '../../assets/portafolioLogo.svg';
import logoLinkedin from '../../assets/linkedinLogo.svg';

export default function Cabecera() {
    return (
        <header className="flex flex-row items-center justify-between border-b-2 border-gray-300 bg-white px-4 py-3 lg:px-6 lg:py-5 w-full">

            {/* Logo + Nombre */}
            <div className="flex flex-row items-center gap-2 lg:gap-6 flex-shrink-0">
                <img 
                    src={logoImg} 
                    alt="Logo" 
                    className="w-10 h-10 lg:w-20 lg:h-20" 
                />
                <div className="text-left">
                    <h1 className="font-bold text-sm md:text-lg lg:text-3xl leading-snug">
                        <span className="text-Axa-blue">N</span>icolas{' '}
                        <span className="text-Axa-blue">L</span>is{' '}
                        <span className="text-Axa-blue">C</span>ruz
                    </h1>
                    <p className="text-xs md:text-sm lg:text-base text-gray-700">
                        Software Developer & Data Engineer
                    </p>
                </div>
            </div>

            {/* Links a Portafolio y Linkedin */}
            <div className="flex flex-row items-center gap-4 lg:gap-12 flex-shrink-0">
                <a
                    href="https://nicolis15.github.io/webNicolas/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center hover:scale-105 transition"
                >
                    <img src={logoPortafolio} alt="Portafolio" className="w-6 lg:w-10 mb-1" />
                    <span className="hidden md:block text-sm lg:text-base font-medium">My Portfolio</span>
                </a>

                <a
                    href="https://www.linkedin.com/in/nicolasliscruz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center hover:scale-105 transition"
                >
                    <img src={logoLinkedin} alt="Linkedin" className="w-6 lg:w-10 mb-1" />
                    <span className="hidden md:block text-sm lg:text-base font-medium">LinkedIn</span>
                </a>
            </div>

        </header>
    );
}
