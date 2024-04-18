import { calculateCurrentYear } from "@/utils/calculateCurrentYear"

export const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        <a href="https://www.linkedin.com/in/manuel-atance/">Manuel Atance - {calculateCurrentYear()}<sup>©</sup></a>
      </div>
    </footer>
  )
}
