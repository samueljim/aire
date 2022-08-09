import { useEffect, useState } from "react";
import moment from "moment";

const formattedDate = (date) => {
  return moment(date).format("MMM Do hh:mm a");
};

function Page({ number, refresh }) {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchData = async () => {
    try {
    const res = await fetch(`/api/submissions/${number}/metrics`);
    const body = await res.json();
    if (body.status === "success") {
      setLeaderboard(body?.data);
    } else {
      console.error(body?.message);
      setLeaderboard([]);
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  
  useEffect(() => {
    fetchData().catch(console.error);
  }, [refresh]);

  return (
    <>
      <h2 className="text-xl mb-2 mx-1">Leaderboard</h2>
      <div className="mb-4 mx-1 overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Earliest Correct Submission Time </th>
              <th>Number Of Attempts</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((submission, index) => (
              <tr key={index}>
                <td>{submission.name}</td>
                <td title={submission.earliestCorrectTime}>
                  {submission.earliestCorrectTime
                    ? formattedDate(submission.earliestCorrectTime)
                    : "N/A"}
                </td>
                <td>{submission.attempts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Page;
