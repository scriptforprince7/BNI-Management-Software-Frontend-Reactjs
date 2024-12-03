import React from "react";
import Navbar from "../components/navbar/navbar";
import PaymentButtons from "../components/paymentButtons/paymentButtons";
import Footer from "../components/footer/footer";
import Copyright from "../components/footer/copyright";
import Breadcrumb from "../components/breadcum/breadcrumb";
import { useState } from "react";

const CommitmentSheet = () => {
  const link = "commitment-sheet";
  const [commitmentSheet, setCommitmentSheet] = useState({
    commitmentChapter: "",
    memberName: "",
    date: "",
  })

  const handleForm = (e)=>{
    e.preventDefault();
    console.log(commitmentSheet)
  }

  return (
    <>
      <Navbar />
      <Breadcrumb link={link} />
      <main className="border-none rounded-lg shadow-lg  sm:mx-10 md:mx-20 lg:mx-40 my-5 px-5 py-4">
        <div>
          <h1 className="text-center text-2xl sm:text-3xl pb-2 font-bold">
            Interviewing Applicants
          </h1>
          <h3 className="text-center pb-3 text-sm sm:text-lg">
            Prior to Approving an Application
          </h3>
        </div>
        <form onSubmit={handleForm} className="p-4">
          <section className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="chapter"
                  className="text-sm font-medium text-gray-700"
                >
                  Chapter:
                </label>
                <input
                  id="chapter"
                  type="text"
                  value={commitmentSheet.commitmentChapter}
                  onChange={(e) =>
                    setCommitmentSheet({
                      ...commitmentSheet,
                      commitmentChapter: e.target.value,
                    })
                  }
                  className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="memberName"
                  className="text-sm font-medium text-gray-700"
                >
                  Member Name:
                </label>
                <input
                  id="memberName"
                  type="text"
                  value={commitmentSheet.memberName}
                  onChange={(e) =>
                    setCommitmentSheet({
                      ...commitmentSheet,
                      memberName: e.target.value,
                    })
                  }
                  className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-gray-700"
                >
                  Date:
                </label>
                <input
                  id="date"
                  type="date"
                  value={commitmentSheet.date}
                  onChange={(e) =>
                    setCommitmentSheet({
                      ...commitmentSheet,
                      date: e.target.value,
                    })
                  }
                  className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                />
              </div>
            </div>
          </section>

          <section className="mb-6">
            <p className="font-bold mb-4">
              Below are questions to ask when interviewing an applicant. Keep in
              mind that this is just a place to start the conversation. You can
              add any questions you feel are pertinent or applicable to your
              chapter's needs.
            </p>
            <div className="space-y-4">
              {[
                "Why did you decide to apply to BNI, specifically our chapter?",
                "What would you say are the strengths you bring to BNI and our chapter?",
                "What do you expect to receive from BNI and from our chapter?",
                "Will the (7:59 am) start time pose any problems with your schedule? (Members are expected to be at the Venue before 7:29 am)",
                "As you know BNI has a clearly defined attendance policy. Can you tell me what it is?",
                "If you cannot attend a meeting, will you be able to have a substitute present?",
                "Will you be able to send 20 invitation letters within the next 6 to 8 weeks to people you believe would benefit from visiting our chapter? [40 letters are mandatory for core groups.]",
                "In reviewing your application, we want to make sure we understand what niche you will be representing in our chapter. What specific products and services do you offer in your industry? Is there an area that you specialize in?",
                "What do you like most about what you do in regards to your profession?",
                "All new members are required to attend a Member Success Program within the first 60 days of membership. Will you be able to attend? (The next session will be on __.)",
                "There are other Trainings (Leadership Training, Power Team Workshop, Referral Skill Workshop, Advanced Referral Skills Workshop, and Presentation Skills Workshop) which you are required to attend in the next 03 months. These are essential for your success as a member. Will you attend?",
                "In the next 6 to 12 months you may be asked to be in a leadership role. Your Chapter Directors will suggest a role for you according to your strengths and aptitude. Are you willing to consider?",
                "What reservations do you have about membership in BNI?",
                "Do you have any questions for me about BNI or our chapter?",
              ].map((question, index) => (
                <div key={index} className="flex items-start">
                  <span className="font-bold mr-2">{index + 1}.</span>
                  <p>{question}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="interviewer"
                  className="text-sm font-medium text-gray-700"
                >
                  Interviewed By (Name/ Chapter Position):
                </label>
                <input
                  id="interviewer"
                  type="text"
                  className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="applicantSignature"
                  className="text-sm font-medium text-gray-700"
                >
                  Applicant's Signature:
                </label>
                <input
                  id="applicantSignature"
                  type="text"
                  className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="rounded-sm shadow-md px-6 py-2 bg-red-600 hover:bg-red-700 text-white"
            >
              Submit
            </button>
          </div>
        </form>
      </main>
      <Footer />
      <Copyright />
    </>
  );
};

export default CommitmentSheet;
