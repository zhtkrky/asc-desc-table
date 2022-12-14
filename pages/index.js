import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [firstToggle, setfirstToggle] = useState(false);
  const [lastToggle, setLastToggle] = useState(false);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // 👇️ sort by String property ASCENDING (A - Z)
  const sortByNameAsc = () => {
    const sorted = [...data.results].sort((a, b) => {
      if (a.name.first < b.name.first) {
        return -1;
      }
      if (a.name.first > b.name.first) {
        return 1;
      }
      return 0;
    });
    setData({ ...data, results: sorted });
  };

  // 👇️ sort by String property DESCENDING (Z - A)
  const sortByNameDesc = () => {
    const sorted = [...data.results].sort((a, b) => {
      if (a.name.first > b.name.first) {
        return -1;
      }
      if (a.name.first < b.name.first) {
        return 1;
      }
      return 0;
    });
    setData({ ...data, results: sorted });
  };

  // 👇️ sort by String property ASCENDING (A - Z)
  const sortByLastNameAsc = () => {
    const sorted = [...data.results].sort((a, b) => {
      if (a.name.last < b.name.last) {
        return -1;
      }
      if (a.name.last > b.name.last) {
        return 1;
      }
      return 0;
    });
    setData({ ...data, results: sorted });
  };

  // 👇️ sort by String property DESCENDING (Z - A)
  const sortByLastNameDesc = () => {
    const sorted = [...data.results].sort((a, b) => {
      if (a.name.last > b.name.last) {
        return -1;
      }
      if (a.name.last < b.name.last) {
        return 1;
      }
      return 0;
    });
    setData({ ...data, results: sorted });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <table>
        <thead>
          <tr>
            <th
              onClick={() => {
                firstToggle ? sortByNameDesc() : sortByNameAsc();
                setfirstToggle(!firstToggle);
              }}
            >
              First Name
            </th>
            <th
              onClick={() => {
                lastToggle ? sortByLastNameDesc() : sortByLastNameAsc();
                setLastToggle(!lastToggle);
              }}
            >
              Last Name
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.results.map((user) => (
            <tr key={user.login.uuid}>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
