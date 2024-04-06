import Link from 'next/link';
import classes from './login.module.css';
import CentreTitle from '../header/menubar/CentreTitle';
import Button from '../ui/button';
import LoginForm  from './loginForm/loginForm';

export default function Login() {

  return (
    <div> 
        <CentreTitle />
        <div className={classes.shadow}>
            <div className={classes.container}>              
                <div className={classes.back_container}>
                    <div className={classes.back}>
                        <Link href={'/'}>
                            <Button text={'Back'} /> 
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        <LoginForm />
    </div>
  )
}