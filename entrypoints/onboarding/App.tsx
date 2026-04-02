import React, { useEffect, useState } from "react";
import { settingsStorage } from "@/utils/storage";
import { Settings, DEFAULT_SETTINGS } from "@/utils/types";

export default function App() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    settingsStorage.getValue().then((loadedSettings) => {
      setSettings(loadedSettings);
      setIsInitializing(false);
    });
  }, []);

  const handleToggle = (key: keyof Settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key] as boolean,
    }));
  };

  const saveAndFinish = async () => {
    await settingsStorage.setValue(settings);
    // Attempt to close the tab after setting up
    window.close();
  };

  if (isInitializing) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-900">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Welcome to Tweet Filter!</h1>
        <p className="text-gray-600 text-lg">
          Please select the topics you'd like to filter from your X/Twitter feed.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2 sm:p-6 space-y-4">
        
        {/* Toggle Items */}
        {[
          {
            key: "blockPolitics",
            title: "Politics",
            desc: "Elections, politicians, political movements"
          },
          {
            key: "blockRacism",
            title: "Racism / Hate Speech",
            desc: "Racial slurs, discrimination, bigotry"
          },
          {
            key: "blockReligion",
            title: "Religion",
            desc: "Religious disputes, extremism, atheism"
          },
          {
            key: "blockWar",
            title: "War & Conflict",
            desc: "International conflicts, regional wars, military strikes"
          },
          {
            key: "blockControversial",
            title: "Controversial Subjects",
            desc: "Other highly debated internet subjects"
          }
        ].map((topic) => (
          <label 
            key={topic.key}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-black/5 hover:border-black/10 border border-transparent cursor-pointer transition-all duration-200 group"
          >
            <div>
              <div className="font-semibold text-lg text-gray-900 group-hover:text-black transition-colors">{topic.title}</div>
              <div className="text-gray-500 text-sm mt-0.5">{topic.desc}</div>
            </div>
            
            {/* Custom Toggle Switch */}
            <div className="ml-4 flex-shrink-0">
              <div className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ease-in-out ${settings[topic.key as keyof Settings] ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ease-in-out shadow-sm ${settings[topic.key as keyof Settings] ? 'translate-x-6' : 'translate-x-1'}`} />
              </div>
              {/* Hidden actual checkbox for accessibility */}
              <input
                type="checkbox"
                className="sr-only"
                checked={settings[topic.key as keyof Settings] as boolean}
                onChange={() => handleToggle(topic.key as keyof Settings)}
              />
            </div>
          </label>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={saveAndFinish}
          className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-12 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save & Finish
        </button>
      </div>
    </div>
  );
}
