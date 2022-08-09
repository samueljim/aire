import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Link } from "wouter";

function Page() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/questions`);
      const body = await res.json();
      if (body.status === "success") {
        setQuestions(body?.data);
      } else {
        console.error(body?.message);
      }
    };
    fetchData().catch(console.error);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="grid sm:grid-cols-3 grid-cols-1 auto-rows-max gap-3 ma-3">
        {questions.map((question, index) => {
          return (
            <div className="card bg-base-100 shadow-xl box-border" key={index}>
              <div className="card-body">
                <h2 className="card-title">Question {question.number}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(question.description),
                  }}
                ></p>
                <div className="card-actions justify-end">
                  <Link key={index} href={`/question/${question.number}`}>
                    <button className="btn btn-primary">Answer now</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
