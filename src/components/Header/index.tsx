import Img from 'next/image';

import { SignInButton } from '../SignInButton';

import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';

export function Header() {


  return (
    <header className={styles.headerContainer }>
      <div className={styles.headerContent }>
        <Img src="/images/logo.svg" alt="ig.news" width="100" height="100" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>Posts</a>
            </ActiveLink>
        </nav>
    
         <SignInButton/> 
        
      </div>
    </header>
  );
}
