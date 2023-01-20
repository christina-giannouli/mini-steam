import React, { useEffect, useState } from 'react';

import Api from '../../api';
import { App } from '../../types';
import { TabList } from './tablist';

import Card from '../Card/Card';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';

import './Tabs.scss';

// TODO: Clean up by moving logic to GameList
const Tabs = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>(TabList[0].name);
  const [content, setContent] = useState<App[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationType, setNotificationType] = useState<'danger' | 'info' | 'success'>(
    'success',
  );
  const [search, setSearch] = useState<string>('');
  const [hasResults, setHasResults] = useState(true);

  const fetchApps = async (): Promise<void> => {
    try {
      const response: App[] = await Api.getAppsByTab(activeTab);
      const apps = response.slice(0, 10);
      setContent(apps);
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setNotificationType('danger');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Couldn't find a proper type for this :(
  const handleClick = (e: any): void => {
    setIsLoading(true);
    setActiveTab(e.target.id);
  };

  const handleSearch = (e: any): void => {
    const { value } = e.target;
    setSearch(value);

    const searchResults = content.filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase()),
    );
    setHasResults(searchResults.length > 0);
  };

  useEffect(() => {
    fetchApps();
    setSearch('');
    setHasResults(true);
  }, [activeTab]);

  return (
    <div className="my-5">
      <div className="tabs p-3 d-flex flex-wrap justify-content-between">
        {TabList.map((tab) => (
          <button
            className="btn rounded-4 py-2 px-3"
            key={tab.name}
            id={tab.name}
            disabled={activeTab === `${tab.name}`}
            onClick={handleClick}>
            {tab.title}
          </button>
        ))}
      </div>
      <div className="px-1 py-5">
        {/* Search field*/}
        <div className="row mb-5">
          <div className="col col-md-4 col-lg-2">
            <label htmlFor="searchByName" className="form-label d-none" />
            <input
              onChange={handleSearch}
              value={search}
              type="search"
              className="form-control"
              id="searchByName"
              placeholder="Search by name"
            />
          </div>
        </div>
        {error && <Notification message={error} type={notificationType} />}
        {isLoading ? (
          <Loader />
        ) : (
          TabList.map((tab) => (
            <>
              {activeTab === `${tab.name}` && (
                <div key={tab.name} className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
                  {hasResults ? (
                    content
                      ?.filter((data) => data.name.toLowerCase().includes(search.toLowerCase()))
                      .map((game) => (
                        <div key={game._id} className="col">
                          <Card
                            _id={game._id}
                            name={game.name}
                            header_image={game.header_image}
                            price_overview={game.price_overview}
                            platforms={game.platforms}
                          />
                        </div>
                      ))
                  ) : (
                    <div className="col offset-sm-3 offset-lg-4">
                      <Notification
                        message={'Nothing found :( . Try a different term.'}
                        type={'info'}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default Tabs;
