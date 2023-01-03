const year = new Date().getFullYear();

const Footer = () => (
  <footer className="flex items-center text-base justify-center mt-8 gap-1 text-color-fifth border-t-2 border-color-fifth border-opacity-10 pt-8">
    <a
      href="https://batuhankendirli.netlify.app/"
      target={'_blank'}
      className="text-lg font-medium footer-link"
    >
      Batuhan Kendirli
    </a>
    <span>- {year}</span>
  </footer>
);

export default Footer;
