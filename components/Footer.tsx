import { calculateCurrentYear } from "@/utils/calculateCurrentYear"

export const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        Manuel Atance - {calculateCurrentYear()}<sup>©</sup>
      </div>
    </footer>
  )
}
