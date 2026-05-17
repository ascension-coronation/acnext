import "./team.css";

import "./team.desktop.css";
import "./team.mobile.css";

import { Footer } from "../page";
import Link from 'next/link';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "kat wang",
      details: "15, canada",
      caption:
        "frontend webdev + javascript enthusiast + artist! DM anytime for help!",
      slack_display: "@kook",
      slack_link: "https://hackclub.enterprise.slack.com/team/U08H34LLQQJ",
      picture: "",
    },
    {
      id: 2,
      name: "erin nguyen",
      details: "16, canada",
      caption: "reviewer/fufillment: LISTEN TO STICKER (NCT 127)!!",
      slack_display: "@Erook",
      slack_link: "https://hackclub.enterprise.slack.com/team/U081RDTKN5D",
      picture: "",
    },
    {
      id: 3,
      name: "joy su",
      details: "18, NC, USA",
      slack_display: "@Joy Su",
      caption: "joyful",
      slack_link: "https://hackclub.enterprise.slack.com/team/U09G78T3MM2",
      picture: "",
    },
    {
      id: 4,
      name: "kaylee dinh",
      details: "17, CA, USA",
      caption: "",
      slack_display: "@Kaylee",
      slack_link: "https://hackclub.enterprise.slack.com/team/U08QMC72ZST",
      picture: "",
    },
    {
      id: 5,
      name: "grass",
      details: "grass, everywhere",
      caption: "",
      slack_display: "@grass",
      slack_link: "https://hackclub.enterprise.slack.com/team/U078WRWQPGF",
      picture: "",
    },
    {
      id: 6,
      name: "bryan tang",
      details: "15, canada",
      caption: "artist and blenderer???",
      slack_display: "@Bryan T",
      slack_link: "https://hackclub.enterprise.slack.com/team/U081REMDML7",
      picture: "",
    },
  ];

  return (
    <div className="page-wrapper">
      <div className="team-wrapper">
        <div className="back-wrapper">
          <img src="/illustrations/squid.png" className="back-squid"/>
          <Link href="/"><h2 className="back-text">back</h2></Link>
        </div>
        <h1 className="team-headline">team</h1>
        <div className="teammembers-wrapper">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`teammember-box ${
                [
                  "box-blue",
                  "box-purple",
                  "box-yellow",
                  "box-blue",
                  "box-yellow",
                  "box-blue",
                  "box-purple",
                ][Number(member.id)]
              }`}
            >
              {/* picture */}
              <div className="flex outline place-items-center">
                <img
                  src={member.picture}
                  alt={member.name}
                  className="teammember-pic"
                />
              </div>
              {/* details */}
              <div>
                <h2 className="teammember-name">{member.name}</h2>
                <div className="flex flex-row gap-2 place-items-center text-center">
                  <h3 className="teammember-details">{member.details}</h3>
                  <h3 className="text-[var(--color-navy)]">•</h3>
                  <a href={member.slack_link} target="_blank">
                    <h3 className="teammember-slack">{member.slack_display}</h3>
                  </a>
                </div>
                <hr className="line"></hr>
                <p className="teammember-caption">{member.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
