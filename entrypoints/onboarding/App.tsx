import { useEffect, useState } from "react";
import { settingsStorage } from "@/utils/storage";
import { Settings, DEFAULT_SETTINGS, CATEGORIES } from "@/utils/types";
import { Icon } from "@/components/Icon";
import { Switch } from "@/components/Switch";

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
    return <div className="min-h-screen flex items-center justify-center text-sm text-charcoal/70">Loading…</div>;
  }

  const enabledCount = CATEGORIES.filter((c) => settings[c.toggle]).length;

  return (
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pb-8">
      <div className="flex-1 flex flex-col w-full max-w-300 mx-auto">
        <nav className="flex items-center justify-between py-5">
          <img src="/logo.png" alt="ZenX" className="h-9 w-auto mix-blend-multiply" />
          <a
            href="https://zenx.asimsk.site"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-charcoal hover:text-forest-ink underline-offset-4 hover:underline"
          >
            zenx.asimsk.site
          </a>
        </nav>

        <div className="grid lg:flex-1 lg:grid-cols-2 gap-3.5 lg:max-h-200">
          <section className="flex flex-col justify-center rounded-xl bg-keylime-wash p-7 sm:p-10.5 lg:p-14">
            <h1 className="font-serif font-light text-forest-ink text-[40px] leading-[1.1] tracking-[-0.01em] sm:text-[56px] sm:tracking-[-0.03em] text-balance">
              Welcome to ZenX. Choose what stays out of your feed.
            </h1>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-charcoal">
              ZenX hides matching tweets as you scroll. You can change these
              anytime from the ZenX icon in your toolbar.
            </p>
            <div className="mt-9">
              <button
                type="button"
                onClick={saveAndFinish}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-forest-ink px-6 py-4 text-base text-cream-paper hover:bg-forest-shadow active:scale-[0.99] transition-[background-color,transform] duration-200 cursor-pointer"
              >
                Save & finish
                <Icon name="arrowRight" className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
              </button>
              <p className="mt-4 text-xs text-charcoal">No account · No data collected · 100% local</p>
            </div>
          </section>

          <section className="flex items-center rounded-xl bg-slate-hush p-4 sm:p-10.5 lg:p-14">
            <div className="w-full rounded-xl bg-cream-paper">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border-mist">
                <h2 className="text-sm font-semibold text-forest-ink">Filters</h2>
                <span className="rounded-full bg-keylime-wash px-2.5 py-1 text-xs text-forest-ink tabular-nums">
                  {enabledCount} of {CATEGORIES.length} on
                </span>
              </div>

              {CATEGORIES.map((topic) => {
                const on = settings[topic.toggle];
                return (
                  <label
                    key={topic.toggle}
                    className="flex items-center gap-3.5 px-5 py-4 border-b border-border-mist last:border-0 cursor-pointer hover:bg-keylime-wash/50 transition-colors duration-200"
                  >
                    <span
                      className={`flex items-center justify-center size-9 rounded-full transition-colors duration-200 ${
                        on ? "bg-mint-veil text-forest-ink" : "bg-border-mist text-charcoal/70"
                      }`}
                    >
                      <Icon name={topic.icon} className="size-4" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-medium text-charcoal">{topic.title}</span>
                      <span className="block text-[13px] text-charcoal/70">{topic.desc}</span>
                    </span>
                    <Switch checked={on} onChange={() => handleToggle(topic.toggle)} />
                  </label>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
