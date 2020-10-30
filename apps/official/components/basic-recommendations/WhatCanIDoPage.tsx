import { SvgIcon } from "@material-ui/core";
import React, { ReactElement } from "react";

import NoContactsIcon from "../../static/images/no-contacts.svg";
import { MeasureSection } from './MeasureSection';

const CONTACT_HEADLINE = "Kontakte reduzieren";
const CONTACT_TEXT = "Kontakte reduzieren ist eine der wirkungsvollsten Maßnahmen.\n Das Virus wird von Mensch-zu-Mensch übertragen. Wenn man sich nicht trifft, kann das Virus also nicht übertragen werden. Greife zum Telefonhörer, halte eine Videokonferenz und arbeite von zu Hause, wann immer dies möglich ist. So schwer es auch fällt, Kontakte minimieren schützt und hilft uns allen, vor allem in Risikogebieten. Seid dabei und helft mit!";
const CONTACT_COLOR = "#cc66ff"

const ContactSection: React.FC<{}> = () => <MeasureSection
    title={CONTACT_HEADLINE}
    description={CONTACT_TEXT}
    color={CONTACT_COLOR}
    icon={NoContactsIcon}
/>    

const icon = NoContactsIcon;

export const WhatCanIDoPage: React.FC<{}> = () => 
    //<SvgIcon component={NoContactsIcon}/>
    <ContactSection/>




