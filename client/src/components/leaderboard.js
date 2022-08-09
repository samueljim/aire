import { useEffect, useState } from "react";
import moment from "moment";

function Page({ number }) {
  const [leaderboard, setLeaderboard] = useState([]);

  const formattedDate = (date) => {
    return moment(date).format("MMM Do hh:mm a");
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/submissions/${number}/metrics`);
      const body = await res.json();
      console.log(body);
      if (body.status === "success") {
        setLeaderboard(body?.data);
      } else {
        console.error(body?.message);
        setLeaderboard([]);
      }
    };
    fetchData().catch(console.error);
  }, []);
  return (
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
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
                {formattedDate(submission.earliestCorrectTime)}
              </td>
              <td>{submission.attempts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
