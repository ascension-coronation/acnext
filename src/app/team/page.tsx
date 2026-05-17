import "./team.css";
import { Footer } from "../page";
import Link from 'next/link';

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "kat wang",
      details: "15, canada",
      caption:
        "frontend webdev/javascript enthusiast, artist, beginner gamedev :0 DM anytime for help!",
      slack_display: "@kook",
      slack_link: "",
      picture: "",
    },
    {
      id: 2,
      name: "erin nguyen",
      details: "16, canada",
      caption: "reviewer/fufillment",
      slack_display: "@Erook",
      slack_link: "",
      picture: "",
    },
    {
      id: 3,
      name: "joy su",
      slack_display: "@Joy Su",
      slack_link: "",
      picture: "",
    },
    {
      id: 4,
      name: "kaylee dinh",
      details: "17, CA, USA",
      caption: "",
      slack_display: "",
      slack_link: "",
      picture: "",
    },
    {
      id: 5,
      name: "grass",
      details: "grass, everywhere",
      caption: "",
      slack_display: "",
      slack_link: "",
      picture: "",
    },
    {
      id: 6,
      name: "bryan tang",
      details: "15, canada",
      caption: "artist and blenderer???",
      slack_display: "",
      slack_link: "",
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
                  <h3 className="teammember-slack">{member.slack_display}</h3>
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
