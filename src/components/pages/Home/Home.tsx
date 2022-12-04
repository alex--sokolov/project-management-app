import './Home.scss';

const welcome = {
  title: 'Project Management',
  desc: 'Organize your time properly',
  featuresDesc: 'with our application you will have more time for',
  features: ['rest', 'favorite serial', 'family', 'just eat ice cream'],
  info: "This application is the final project created as part of the RS School 'Developing with React' course. 'Project Management' is another version of the implementation of programs that help manage projects based on the kanban method.",
  teamTitle: 'our team',
  team: ['alexander', 'aliona', 'andrei'],
  position: ['team lead, developer', 'developer', 'developer'],
  role: [
    'Teamlead, developed application architecture, routing, for the main components. Created backend services and modules.',
    'Responsible for the form edit profile, localization, for the components: header, footer, welcome page.',
    'Attended actively in application architecture development. Responsible for the forms: authorization, registration.',
  ],
};

export const Home = () => {
  const className = 'welcome__team-card-image_';
  return (
    <>
      <div className="welcome">
        <div className="welcome__title-container">
          <h2 className="welcome__title">{welcome.title}</h2>
          <p className="welcome__title-desc">{welcome.desc}</p>
        </div>

        <div className="welcome__features-container">
          <span className="welcome__features-desc">{welcome.featuresDesc}</span>
          <ul className="welcome__features">
            {welcome.features.map((item, i) => {
              return (
                <li className="welcome__features-item" key={i}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="welcome__info-container">
          <p className="welcome__info">{welcome.info}</p>
        </div>
        <div className="welcome__team-container">
          <h3 className="welcome__team-title">{welcome.teamTitle}</h3>
          <ul className="welcome__team">
            {welcome.team.map((item: string, i: number) => {
              return (
                <li className="welcome__team-item" key={i}>
                  <div className="welcome__team-card">
                    <div className="welcome__team-card-header">
                      <div className={className + i}></div>
                      <div className="welcome__team-card-title" key={i}>
                        {item}
                      </div>
                      <div className="welcome__team-card-subtitle" key={i}>
                        {welcome.position[i]}
                      </div>
                    </div>
                    <p className="welcome__team-card-content" key={i + 3}>
                      {welcome.role[i]}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
