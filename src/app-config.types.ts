import { FunctionComponent } from 'react'
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export type AppConfig = {
    ui: AppUI;
    buildJSON: BuildJSON;
}

type BuildJSON = {
    /**
     * Absolute URL path to an image to be used in the loading/splash screen
     * Example:
     * app-config/static/logo.svg
     * -> www.domain.com/logo.svg
     * -> logoSrc: "/logo.svg"
     */
    splashLogo: string;
    logoSrc?: string;
    meta: AppMeta;
}

export type AppMeta = {
    /**
     * Application Title, used as Logo alt text and in html head title
     */
    title: string;
}

export type AppUI = {
    Logo?: FunctionComponent<any>;
    theme?: Theme;
}