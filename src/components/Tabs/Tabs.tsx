import React, { useEffect, useState } from 'react';

import Api from '../../api';
import { Game } from '../../types';
import Card from '../Card/Card';

import './Tabs.scss';

// TODO: Move to constants file
export const TabList = [
  {
    name: 'new_and_trending',
    title: 'New & Trending',
  },
  {
    name: 'top_sellers',
    title: 'Top Sellers',
  },
  {
    name: 'being_played',
    title: 'Being Played',
  },
  {
    name: 'upcoming',
    title: 'Upcoming',
  },
];

const Tabs = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(TabList[0].name);
  const [content, setContent] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApps = async (): Promise<void> => {
    try {
      const apps = await Api.getAppsByTab(activeTab);
      setContent(apps);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (e: any): void => {
    setIsLoading(true);
    setActiveTab(e.target.id);
  };

  useEffect(() => {
    fetchApps();
  }, [activeTab]);

  return (
    <div className="mt-5">
      <div className="tabs p-3 d-flex flex-wrap justify-content-between">
        {TabList.map((tab) => (
          <button
            className="rounded-4 py-2 px-3"
            key={tab.name}
            id={tab.name}
            disabled={activeTab === `${tab.name}`}
            onClick={handleClick}>
            {tab.title}
          </button>
        ))}
      </div>
      <div className="px-1 py-5">
        {TabList.map((tab) => (
          <>
            {activeTab === `${tab.name}` && (
              <div key={tab.name} className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
                {content?.map((game) => (
                  <div key={game._id} className="col">
                    <Card
                      _id={game._id}
                      name={game.name}
                      header_image={game.header_image}
                      price_overview={game.price_overview}
                      platforms={game.platforms}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
