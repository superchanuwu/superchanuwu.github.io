import React, { useEffect, useState } from "react";
import "./App.css";
import { ExternalLink } from "lucide-react";
export default function App() {
  const username = "rizalalfadlil";

  const [data, setdata] = useState([]);
  const [profile, setProfile] = useState();
  const getData = async () => {
    try {
      const data = await fetch(
        `https://api.github.com/users/${username}/repos`
      ).then((res) => res.json());
      const profile = await fetch(
        `https://api.github.com/users/${username}`
      ).then((res) => res.json());
      setProfile(profile);
      console.log(profile);
      setdata(data.filter((a: { has_pages: boolean }) => a.has_pages));
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <main className=" min-h-screen w-full bg-white flex flex-col gap-20">
      <div className="sm:px-20 md:px-40 lg:px-60 xl:px-80">
        <div className="py-8 p-4">
          <p className="text-2xl font-bold">are you lost ?</p>
          <p>Perhaps one of these pages is what you're looking for.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-2 py-2">
          <div className=" md:col-span-2 px-4 bg-slate-200/25 p-1">
            <p className="text-sm">
              all <b>{username}'s</b> active github repository pages
            </p>
          </div>
          {data.map((d, i) => (
            <div
              onClick={() =>
                (window.location.href = `https://${username}.github.io/${d.name}`)
              }
              className="p-4 hover:bg-slate-200/25 grow rounded-sm cursor-pointer transition-all duration-300"
            >
              <p className="line-clamp-1 min-h-[1.5rem] leading-[1.5rem] font-bold">
                {d.name}
              </p>
              <p className="text-xs overflow-y-scroll text-nowrap hiddenscroll">
                {d.description ? d.description : "no description"}
              </p>
              <p className="text-xs overflow-y-scroll text-nowrap hiddenscroll text-stone-500 border-b w-fit">{`https://${username}.github.io/${d.name}`}</p>
            </div>
          ))}
        </div>
      </div>
      {profile && (
        <div className="bg-slate-200 flex flex-row grow sm:px-20 md:px-40 lg:px-60 xl:px-80 py-8">
          <div className="grow grid content-center justify-center sm:justify-start gap-4">
            <p className="font-bold">github profile</p>
            <div className="grid sm:flex justify-center sm:justify-start gap-4 items-center">
              <div
                className="aspect-square w-24 rounded-full bg-center bg-cover"
                style={{
                  backgroundImage: `url("${profile.avatar_url}")`,
                }}
              ></div>
              <div className="space-y-4">
                <p className="font-bold text-2xl">{profile.name}</p>
                <div className="flex gap-2 text-sm">
                  <p>followers : <b>{profile.followers}</b></p>
                  <p>public repos : <b>{profile.public_repos}</b></p>
                </div>
                <div className="grid sm:flex gap-2">
                  <button
                    onClick={() =>
                      (window.location.href = `https://github.com/${username}`)
                    }
                    className="p-2 justify-center flex items-center gap-2 bg-slate-300 rounded-sm text-sm font-bold hover:bg-slate-400/40 px-8 transition-all duration-300"
                  >
                    visit profile
                    <ExternalLink size={16} />
                  </button>
                  <button onClick={() =>
                      (window.location.href = `https://${username}.github.io`)
                    } className="p-2 justify-center flex items-center gap-2 bg-slate-300 rounded-sm text-sm font-bold hover:bg-slate-400/40 px-8 transition-all duration-300">
                    visit this page repo
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
