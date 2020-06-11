import React, {useEffect} from "react";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {JSXElement} from "@babel/types";
import {Link} from "react-router-dom";
import {Container} from "react-bootstrap";

const Home = (props: any) => {
    const [releaseNotesBlock, setReleaseNotesBlock] = React.useState(<div/>);
    const [infoApplicationBlock, setInfoApplicationBlock] = React.useState(<div/>);

    useEffect(() => {
        setReleaseNotesBlock(
            <div>
                <Container style={{overflowY: 'scroll', height: '500px', textAlign: 'left'}}>
                    <h3>Release notes</h3>
                    <ul>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-29'>WES-29</a>] - functional
                            requirements
                            versie 1 opzetten
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-30'>WES-30</a>] - Versie 1 van C2
                            maken
                            voor Architectuur
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-31'>WES-31</a>] - Kubernetes en
                            rancher
                            onderzoeken
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-32'>WES-32</a>] - Kubernetes demo
                            maken
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-33'>WES-33</a>] - backlog planning
                            verder
                            uitbreiden na functional requirements
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-35'>WES-35</a>] - PDR oplevering
                            voorbereiden
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-37'>WES-37</a>] - Verantwoordingen
                            van
                            mijn
                            sprint 0 keuzes verantwoorden en opnieuw inleveren in canvas.
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-48'>WES-48</a>] - PDR bijwerken
                            week 5
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-49'>WES-49</a>] - PDR bijwerken
                            week 6
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-56'>WES-56</a>] - Sprint 2 planning
                            maken
                            en eventueel backlog aanvullen
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-57'>WES-57</a>] - Sprint 1
                            oplevering
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-79'>WES-79</a>] - Jenkins beeld
                            CICD
                            pipeline maken voor deployment op een rancher omgeving
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-80'>WES-80</a>] - acme.sh for in
                            combinatie
                            met kubernetes activeren
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-81'>WES-81</a>] - non-functionals
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-91'>WES-91</a>] - ALS developer WIL
                            IK
                            mijn
                            React-Web-Application met een Jenkins pipline zetten ZODAT het Continuously delivered wordt
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-92'>WES-92</a>] - ALS Devops
                            engineer
                            WIL
                            IK dat jenkins een image die ik heb gebouwd pushen naar een public register ZODAT Kubernetes
                            deze
                            kan gebruiken
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-94'>WES-94</a>] - ALS Gebruiker WIL
                            IK
                            een
                            account kunnen registreren met gebruikersnaam en wachtwoord ZODAT ik hiermee kan inloggen
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-95'>WES-95</a>] - ALS Gebruiker WIL
                            IK
                            in
                            kunnen loggen op een account dat geregistreerd is ZODAT ik privileges van mijn account kan
                            gebruiken
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-96'>WES-96</a>] - ALS Schrijver WIL
                            IK
                            nadat ik ben ingelogd begroet worden door een homescherm waarin mijn werelden staan ZODAT ik
                            hier
                            makkelijk naar kan navigeren
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-97'>WES-97</a>] - ALS Schrijver WIL
                            IK
                            2
                            lijsten kunnen overzien in mijn homescherm, 1 lijst waarin de werelden staan waar ik een
                            contributor
                            ben en 1 lijst van werelden die ik volg ZODAT ik makkelijk de werelden die ik wil bijhouden
                            kan
                            bijhouden
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-98'>WES-98</a>] - ALS Schrijver WIL
                            IK
                            een
                            wereld kunnen volgen ZODAT deze op mijn lijst op mijn homescherm
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-99'>WES-99</a>] - ALS Schrijver WIL
                            IK
                            naar
                            een wereld kunnen navigeren ZODAT ik de inhoud van deze wereld kan bekijken
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-100'>WES-100</a>] - ALS Schrijver
                            WIL
                            IK
                            een nieuwe wereld kunnen aanmaken ZODAT ik een eigen wereld heb
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-101'>WES-101</a>] - ALS Schrijver
                            WIL
                            IK
                            een schrijver uitnodigen in mijn eigen wereld ZODAT deze kan bijdragen aan mijn wereld
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-102'>WES-102</a>] - ALS Schrijver
                            WIL
                            IK
                            een schrijver verwijderen uit mijn wereld ZODAT deze niet meer dingen kan aanpassen aan mijn
                            wereld
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-103'>WES-103</a>] - ALS Schrijver
                            WIL
                            IK
                            een verhaal binnen een wereld beginnen ZODAT ik dit verhaal dan in mijn wereld kan
                            neerzetten
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-104'>WES-104</a>] - ALS Schrijver
                            WIL
                            IK
                            een pagina toevoegen aan mijn verhaal ZODAT mijn verhaal inhoud krijgt
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-105'>WES-105</a>] - ALS Schrijver
                            WIL
                            IK in
                            een wereld een cel kunnen maken ZODAT deze weergeven kan worden
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-106'>WES-106</a>] - ALS Schrijver
                            WIL
                            IK de
                            kleur van een cel in een wereld kunnen wijzigen ZODAT deze anders wordt weergeven
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-112'>WES-112</a>] - ALS Schrijver
                            WIL
                            IK
                            een lijst van mijn deelnemers van een wereld kunnen zien ZODAT ik weet wie aan deze wereld
                            bijdragen
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-115'>WES-115</a>] - Als developer
                            WIL
                            IK
                            dat mijn .net core authenticatie service met een jenkins pipeline gereleased wordt ZODAT het
                            Continuously delivered wordt.
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-117'>WES-117</a>] - ALS developer
                            WIL
                            IK
                            mijn CICD Pipeline uittekenen voor frontend en authenticatie service ZODAT ik een beter
                            architectuur
                            beeld kan creëren
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-118'>WES-118</a>] - ALS Developer
                            WIL
                            IK
                            een beeld vast leggen van mijn k8s omgeving ZODAT ik een beter architectuur beeld kan
                            creëren
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-119'>WES-119</a>] - ALS Developer
                            WIL
                            IK
                            voor mijn wereld service een keuze maken in welke technologie ik hiervoor ga gebruiken ZODAT
                            ik
                            hier
                            de beste technologie voor gebruik en dit heb onderbouwd voor de docenten
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-120'>WES-120</a>] - ALS Developer
                            WIL
                            IK
                            voor mijn wereld service een github actions neer zetten ZODAT de wereld service continuously
                            delivered wordt.
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-121'>WES-121</a>] - ALS Developer
                            WIL
                            IK
                            mijn wereld service opzetten ZODAT ik hier features voor kan implementeren
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-122'>WES-122</a>] - ALS Developer
                            WIL
                            IK
                            mijn authentication service opzetten ZODAT ik hier features voor kan implementeren
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-123'>WES-123</a>] - Als Developer
                            WIL
                            IK in
                            C# dependency injection implementeren ZODAT ik repository interfaces kan gebruiken
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-124'>WES-124</a>] - ALS Developer
                            WIL
                            IK
                            een mysql Database online zetten voor mijn development omgeving ZODAT ik tijdens het
                            ontwikkelen
                            van
                            mijn applicatie data persistence heb.
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-125'>WES-125</a>] - ALS Developer
                            WIL
                            ik
                            mijn mysql database gebruiken met het Entitiy framework ZODAT ik ORM toepas en makkelijker
                            met
                            data
                            kan omgaan
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-126'>WES-126</a>] - Als Developer
                            WIL
                            IK
                            mijn frontend bijwerken van SPRINT 2 ZODAT mijn applicatie meer representatief is.
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-127'>WES-127</a>] - Als Developer
                            WIL
                            IK
                            Continuous deployment implementeren op een .net api service ZODAT ik op pull requests naar
                            de
                            master
                            deze deployment kan updaten
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-128'>WES-128</a>] - Als developer
                            WIL
                            ik
                            een message queue implementeren en testen ZODAT ik Asynchroon berichten kan struren van
                            microservices waardoor ik nonfunctionaliteiten kan aantonen
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-167'>WES-167</a>] - Als Developer
                            WIL
                            IK
                            dat React-redux opnieuw wordt geïmplementeerd ZODAT pagina&#39;s hier beter op gebuild
                            kunnen
                            worden
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-169'>WES-169</a>] - Als Developer
                            WIL
                            IK de
                            Cell Service Opzetten ZODAT ik hier features op kan bouwen
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-172'>WES-172</a>] - Als Developer
                            WIL
                            IK de
                            middelware JWT verder uitwerken naar authorisatie ZODAT Bepaalde acties alleen door bepaalde
                            rollen
                            kunnen worden gedaan
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-175'>WES-175</a>] - ALS Developer
                            WIL
                            IK
                            dat de Authenticatie Service Mongo-DB gebruik en als User Id een GUID gebruik
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-190'>WES-190</a>] - Als Developer
                            wil
                            ik
                            authorisatie (jwt) op de put en post request implementeren in de cell-service ZODAT Geen
                            willekeurig
                            gebruiker veranderingen kan aanbrengen
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-191'>WES-191</a>] - Als Developer
                            Wil
                            Ik de
                            Ver haal service opzetten
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-192'>WES-192</a>] - Als Developer
                            Wil
                            ik
                            een grid kunnen openen en de details inzien ZODAT ik hier de pagina&#39;s van kan inlezen en
                            de
                            cell
                            kleuren kan veranderen
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-193'>WES-193</a>] - ALS gebruiker
                            WIL
                            IK
                            zien of ik een schrijver of een volger ben van een wereld ZODAT ik een beter overzicht heb
                        </li>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-195'>WES-195</a>] - Als Developer
                            WiL
                            IK
                            een stable release uitbrengen van master in de laatste week ZODAT ik deze juist kan
                            presenteren
                            aan
                            de docenten
                        </li>
                    </ul>

                    <h2> Bug
                    </h2>
                    <ul>
                        <li>[<a href='https://florisfeddema.atlassian.net/browse/WES-186'>WES-186</a>] - nginx routing
                            to
                            404
                            when not navigating with browser adress instead of links of application
                        </li>
                    </ul>
                </Container>
            </div>
        );
        setInfoApplicationBlock(
            <div style={{marginTop: '50px', marginBottom: '50px', textAlign: 'center'}}>
                <p>
                    Together we write is an application that is inspired by epic fantasy books. These books are take
                    place in one universe which can be huge.
                </p>
                <p>
                    What this application is trying to accomplish is that you can combine all these books, the entire
                    universe and its lore into one world on the internet. With other people
                </p>
            </div>
        )
    }, []);

    let account = props.authentication;
    if (account.isAuthenticated) {
        return (
            <Container style={{marginTop: '30px', backgroundColor: '#dedede', boxShadow: '5px 6px 50px #888888'}}>
                <div style={{textAlign: 'center'}}>
                    <h4>Hello : {account.username}</h4>
                </div>
                {infoApplicationBlock}
                {releaseNotesBlock}
            </Container>
        );
    } else {
        return (
            <Container style={{marginTop: '30px', backgroundColor: '#dedede', boxShadow: '5px 6px 50px #888888'}}>
                <div style={{marginTop: '50px', marginBottom: '50px', textAlign: 'center'}}>
                    <p>
                        Hello Guest
                    </p>
                    <p>
                        Already have an account click <Link to={'/login'}>here</Link> to login.
                    </p>
                    <p>
                        Want to register click <Link to={'register'}>here</Link>.
                    </p>
                </div>
                {infoApplicationBlock}
                {releaseNotesBlock}
            </Container>
        );
    }
};


const mapStateToProps = (state: any) => {
    return {
        authentication: state.authentication
    };
};

export default withRouter(connect(mapStateToProps)(Home));