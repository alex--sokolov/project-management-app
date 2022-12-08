import './Home.scss';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const className = 'welcome__team-card-image_';
  const { t } = useTranslation();

  const team: string[] = t('welcome.team', { returnObjects: true });
  const features: string[] = t('welcome.features', { returnObjects: true });
  const position: string[] = t('welcome.position', { returnObjects: true });
  const role: string[] = t('welcome.role', { returnObjects: true });

  return (
    <>
      <div className="welcome">
        <div className="welcome__title-container">
          <h2 className="welcome__title">{t('welcome.title')}</h2>
          <p className="welcome__title-desc">{t('welcome.desc')}</p>
        </div>
        <div className="welcome__features-container">
          <span className="welcome__features-desc">{t('welcome.features-desc')}</span>
          <ul className="welcome__features">
            {features.map((item, i) => {
              return (
                <li className="welcome__features-item" key={i}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="welcome__info-container">
          <p className="welcome__info">{t('welcome.info')}</p>
        </div>
        <div className="welcome__team-container">
          <h3 className="welcome__team-title">{t('welcome.team-title')}</h3>
          <ul className="welcome__team">
            {team.map((item: string, i: number) => {
              return (
                <li className="welcome__team-item" key={i + 5}>
                  <div className="welcome__team-card">
                    <div className="welcome__team-card-header">
                      <div className={className + i}></div>
                      <div className="welcome__team-card-title" key={i + 25}>
                        {item}
                      </div>
                      <div className="welcome__team-card-subtitle" key={i + 100}>
                        {position[i]}
                      </div>
                    </div>
                    <p className="welcome__team-card-content" key={i + 70}>
                      {role[i]}
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
