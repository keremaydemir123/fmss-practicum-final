import GithubLinkIcon from '../icons/GithubLinkIcon';
import LinkedingLinkIcon from '../icons/LinkedinLinkIcon';
import ThemeSwitcher from './ThemeSwitcher';

function Footer() {
  return (
    <div className="w-full flex items-center justify-between gap-2 border-t pt-4">
      <ThemeSwitcher />
      <div className="flex gap-2 items-center">
        <GithubLinkIcon />
        <LinkedingLinkIcon />
      </div>
    </div>
  );
}

export default Footer;
