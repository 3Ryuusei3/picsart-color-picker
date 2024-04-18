import { WebLogoIcon } from '@/components/Icons/webLogoIcon';

export const Header = () => {
  return (
    <header>
      <div className='header__container'>
        <WebLogoIcon />
        <a href="mailto:atance3@hotmail.com" className='btn btn--secondary'>Contact me!</a>
      </div>
    </header>
  )
}
