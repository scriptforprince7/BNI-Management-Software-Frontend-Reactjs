import React, { useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import PaymentButtons from "../components/paymentButtons/paymentButtons";
import Footer from "../components/footer/footer";
import Copyright from "../components/footer/copyright";
import Breadcrumb from "../components/breadcum/breadcrumb";
import { useState } from "react";
import baseUrl from "../utils/baseurl";
import LoaderImg from "../components/loading/loading";

const InterviewSheet = () => {
  const link = "interview-sheet";
  const [interviewSheet, setInterviewSheet] = useState({
    commitmentChapter: "",
    memberName: "",
    date: "",
    interviewdBy: "",
    applicantSign: "",
    sessionDate: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question8: "",
    question9: "",
    question10: "",
    question11: "",
    question12: "",
    question13: "",
    question14: "",
  });

  const [chapterData, setChapterData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state for better UX
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/chapters`);
        if (!response.ok) {
          throw new Error("Failed to fetch chapters");
        }
        const data = await response.json();
        console.log("chapters data", data);
        setChapterData(data);
        // setCommitmentSheet((prev) => ({ ...prev, commitmentChapter: data.chapter_name })); // Assuming API returns an array of chapters
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(interviewSheet);

    try {
      setLoading(true); // Start loading
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: JSON.stringify(interviewSheet),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setModalContent("Form submitted successfully!");
        setInterviewSheet({
          commitmentChapter: "",
          memberName: "",
          date: "",
          interviewdBy: "",
          applicantSign: "",
          sessionDate: "",
        });
      } else {
        setModalContent(data.message || "An error occurred. Please try again.");
      }
      setModalOpen(true); // Open modal with feedback
    } catch (error) {
      console.error(error);
      setModalContent("An unexpected error occurred. Please try again later.");
      setModalOpen(true); // Open modal with error feedback
    } finally {
      setLoading(false); // Stop loading
    }
  };
  const openModal = (url) => {
    setModalContent(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      <Navbar />
      <Breadcrumb link={link} />
      {loading ? (
        <LoaderImg />
      ) : (
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
                  <select
                    id="chapter"
                    className="border py-1 px-1"
                    value={interviewSheet.commitmentChapter}
                    onChange={(e) =>
                      setInterviewSheet((prev) => ({
                        ...prev,
                        commitmentChapter: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled>
                      Select a Chapter
                    </option>
                    {chapterData.map((chapter, index) => (
                      <option key={index} value={chapter.chapter_name}>
                        {chapter.chapter_name}
                      </option>
                    ))}
                  </select>
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
                    value={interviewSheet.memberName}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
                        memberName: e.target.value,
                      })
                    }
                    className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold mt-2"
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
                    value={interviewSheet.date}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
                        date: e.target.value,
                      })
                    }
                    className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold mt-2"
                  />
                </div>
              </div>
            </section>

            <section className="mb-6">
              <p className="font-bold mb-4">
                Below are questions to ask when interviewing an applicant. Keep
                in mind that this is just a place to start the conversation. You
                can add any questions you feel are pertinent or applicable to
                your chapter's needs.
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
                ].map((question, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-start mb-1">
                      <span className="font-bold mr-2">{index + 1}.</span>
                      <p>{question}</p>
                    </div>
                    <textarea
                      id={`question${index + 1}`}
                      rows="2"
                      className="bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 font-semibold"
                      value={interviewSheet[`question${index + 1}`]}
                      onChange={(e) =>
                        setInterviewSheet((prevState) => ({
                          ...prevState,
                          [`question${index + 1}`]: e.target.value,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-4 my-3">
                <span>
                  <strong className="font-bold mr-2">10.</strong>All new members
                  are required to attend a Member Success Program within the
                  first 60 days of membership. Will you be able to attend? (The
                  next session will be on{" "}
                  <input
                    type="date"
                    className="border-slate-600 border-b-2 focus:outline-none leading-none pl-2"
                    value={interviewSheet.sessionDate}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
                        sessionDate: e.target.value,
                      })
                    }
                  />{" "}
                  .)
                </span>
              </div>
              <div className="space-y-4">
                {[
                  "There are other Trainings (Leadership Training, Power Team Workshop, Referral Skill Workshop, Advanced Referral Skills Workshop, and Presentation Skills Workshop) which you are required to attend in the next 03 months. These are essential for your success as a member. Will you attend?",
                  "In the next 6 to 12 months you may be asked to be in a leadership role. Your Chapter Directors will suggest a role for you according to your strengths and aptitude. Are you willing to consider?",
                  "What reservations do you have about membership in BNI?",
                  "Do you have any questions for me about BNI or our chapter?",
                ].map((question, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-start mb-1">
                      <span className="font-bold mr-2">{index + 11}.</span>
                      <p>{question}</p>
                    </div>
                    <textarea
                      id={`question${index + 11}`}
                      rows="2"
                      className="bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 font-semibold"
                      value={interviewSheet[`question${index + 11}`]}
                      onChange={(e) =>
                        setInterviewSheet((prevState) => ({
                          ...prevState,
                          [`question${index + 11}`]: e.target.value,
                        }))
                      }
                    />
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
                    value={interviewSheet.interviewdBy}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
                        interviewdBy: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="applicantSignature"
                    className="text-sm font-medium text-gray-700"
                  >
                    Applicant&apos;s Signature:
                  </label>
                  <input
                    id="applicantSignature"
                    type="text"
                    className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                    value={interviewSheet.applicantSign}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
                        applicantSign: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-center items-center mt-2">
              <button
                type="submit"
                className="rounded-sm shadow-md px-6 py-2 bg-red-600 hover:bg-red-700 text-white mr-5"
              >
                Update
              </button>
              <button className=" text-white rounded-sm shadow-md my-3 px-6 py-2 bg-red-600 hover:bg-red-700">
                <a
                  href="#"
                  onClick={() =>
                    openModal("https://bnipayments.nidmm.org/interview.pdf")
                  }
                  className="text-white"
                >
                  View & Submit
                </a>
              </button>
            </div>
          </form>
        </main>
      )}
      <Footer />
      <Copyright />
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-modal" onClick={closeModal}>
              &times;
            </span>
            <iframe
              src={modalContent}
              title="PDF Viewer"
              width="100%"
              height="500px"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewSheet;
