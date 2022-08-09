import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useReward } from "react-rewards";
import Leaderboard from "../components/leaderboard";

function Page({ number }) {
  const { reward, isAnimating } = useReward("confettiReward", "confetti");
  const [question, setQuestion] = useState({ description: "loading..." });
  const [answer, setAnswer] = useState();
  const [correct, setCorrect] = useState(false);
  const [loading, setLoading] = useState(true);

  const name = window.localStorage.getItem("name");
  if (!name) { 
    window.location.href = "/";
  }
  const answerQuestion = async () => {
    setLoading(true);
    console.log("answerQuestion", answer);
    if (!answer) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/submissions/${number}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          answer: answer,
        }),
      });
      const body = await res.json();
      console.log(body);
      if (body.status === "success" && body.correct) {
        reward();
        setCorrect(true);
      } else {
        setCorrect(false);
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/question/${number}`);
      const body = await res.json();
      console.log(body);
      if (body.status === "success") {
        setQuestion(body?.data);
      } else {
        console.error(body?.message);
        setQuestion({
          description: "This is not a valid question",
        });
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div>
    <div className=" flex place-content-center">
      <div className="card w-96 bg-base-100 shadow-xl h-min mb-10">
        <div className="card-body">
          <h2 className="card-title">Question {number}</h2>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(question.description),
            }}
          ></p>
          <input
            type="text"
            placeholder="Write your answer here"
            className="input input-bordered input-primary w-full max-w-xs"
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="card-actions justify-end">
            <button onClick={answerQuestion} className="btn btn-primary">
              Submit answer
            </button>
            <span id="confettiReward" />
          </div>
        </div>
      </div>
      </div>

      <Leaderboard number={number} />
    </div>
  );
}

export default Page;
