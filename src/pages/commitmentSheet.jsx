import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Copyright from "../components/footer/copyright";
import Breadcrumb from "../components/breadcum/breadcrumb";
import BoldText from "../components/boldText";
import baseUrl from "../utils/baseurl";
import LoaderImg from "../components/loading/loading";

const CommitmentSheet = () => {
  const link = "commitment-sheet";
  const [commitmentSheet, setCommitmentSheet] = useState({
    memberName: "",
    chapter: "",
    chequeNum: "",
    chequeDate: "",
    bank: "",
    neftNum: "",
    name: "",
    date: "",
    email: "",
    mobile: "",
    category: "",
    sponsor: "",
    gstin: "",
    companyName: "",
    inductionDate: "",
    address: "",
    agree1: "",
    agree2: "",
    agree3: "",
    agree4: "",
    agree5: "",
    agree6: "",
    agree7: "",
    agree8: "",
    agree9: "",
    agree10: "",
    agree11: "",
    agree12: "",
    agree13: "",
  });

  const [errors, setErrors] = useState({
    chequeNum: "",
    neftNum: "",
    gstin: "",
    mobile: "",
    chequeDate: "",
    inductionDate: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [chapterData, setChapterData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateFields = () => {
      const { chequeNum, neftNum, gstin, mobile, chequeDate } = commitmentSheet;
      const newErrors = {};

      // Validate Cheque Date
      if (chequeDate) {
        const selectedDate = new Date(chequeDate);
        const today = new Date();
        //today.setHours(0, 0, 0, 0);
        if (selectedDate > today) {
          newErrors.chequeDate = "Cheque date cannot be in the future.";
        }
      }

      // Validate Cheque Number
      if (chequeNum && !/^\d{6}$/.test(chequeNum)) {
        newErrors.chequeNum = "Cheque number must be exactly 6 digits.";
      }

      // Validate NEFT Number
      if (neftNum && !/^\d{16}$/.test(neftNum)) {
        newErrors.neftNum = "NEFT number must be exactly 16 digits.";
      }

      // Validate GSTIN
      if (gstin && !/^\d{15}$/.test(gstin)) {
        newErrors.gstin = "GSTIN must be exactly 15 digits.";
      }

      // Validate Mobile Number
      if (mobile && !/^\d{10}$/.test(mobile)) {
        newErrors.mobile = "Mobile number must be exactly 10 digits.";
      }

      setErrors(newErrors);
    };

    validateFields();
  }, [commitmentSheet]);

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
        //setInterviewSheet((prev) => ({ ...prev, chapter: data })); // Assuming API returns an array of chapters
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
    console.log(commitmentSheet);

    // Check for existing validation errors before submission
    if (Object.keys(errors).length > 0) {
      setModalContent("Please fix validation errors before submitting.");
      setModalOpen(true);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: JSON.stringify(commitmentSheet),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setModalContent("Form submitted successfully!");
        setCommitmentSheet({
          memberName: "",
          chapter: "",
          chequeNum: "",
          chequeDate: "",
          bank: "",
          neftNum: "",
          name: "",
          date: "",
          email: "",
          mobile: "",
          category: "",
          sponsor: "",
          gstin: "",
          companyName: "",
          inductionDate: "",
          address: "",
        });
      } else {
        setModalContent(data.message || "An error occurred. Please try again.");
      }
      setModalOpen(true);
    } catch (error) {
      console.error(error);
      setModalContent("An unexpected error occurred. Please try again later.");
      setModalOpen(true);
    } finally {
      setLoading(false);
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
        <div className="lg:flex lg:justify-center">
          <main className="border-none rounded-lg shadow-lg  sm:mx-10 md:mx-20 lg:mx-40 my-5 px-5 py-4">
            <div>
              <h1 className="text-center text-2xl sm:text-3xl pb-2 font-bold">
                Making the Commitment
              </h1>
              <h3 className="text-center pb-3 text-sm sm:text-lg">
                For Members Joining a Chapter
              </h3>
            </div>
            <form onSubmit={handleForm}>
              <section className="mb-3">
                <p>
                  I,{" "}
                  <input
                    className="border-b border-black focus:outline-none leading-none w-full sm:w-auto pl-1 font-semibold"
                    type="text"
                    value={commitmentSheet.memberName}
                    onChange={(e) =>
                      setCommitmentSheet({
                        ...commitmentSheet,
                        memberName: e.target.value,
                      })
                    }
                  />
                  agree to the following terms and conditions as part of my
                  membership in the
                  <select
                    id="chapter"
                    className="border py-1 pl-3 mx-1"
                    value={commitmentSheet.chapter}
                    onChange={(e) =>
                      setCommitmentSheet((prev) => ({
                        ...prev,
                        chapter: e.target.value,
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
                  chapter of BNI.
                </p>
              </section>
              <section>
                <p className="mb-2">
                  <strong className="font-semibold">1.</strong>{" "}
                  <span>
                    <BoldText text="Time - Arrive latest by 7:29 AM Stay till 9:30 AM at least" />
                  </span>
                  - I understand the importance of arriving early each week
                  prior to "Open Networking" so that I can help greet guests and
                  network with the members. Therefore, I will arrive early each
                  week and I will not leave early, as this is very disruptive to
                  the meeting process.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      name="commitment1"
                      checked={commitmentSheet.agree1 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree1: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      name="commitment1"
                      checked={commitmentSheet.agree1 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree1: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">2.</strong>{" "}
                  <span>
                    <BoldText text='Attendance -Only 3 Absence in 6 months "Rolling Period"' />
                  </span>{" "}
                  - I will attend every meeting and when I am unable to attend,
                  I will send a substitute to take my place. I also understand
                  my responsibility to fully brief my substitute on what they
                  should say and how they are to behave while acting as my
                  substitute.
                  <div className="flex justify-end"> 
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment2"
                      checked={commitmentSheet.agree2 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree2: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment2"
                      checked={commitmentSheet.agree2 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree2: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">3.</strong>{" "}
                  <span>
                    <BoldText text="Substitution" />
                  </span>{" "}
                  -If a member is unable to attend a meeting, a substitute
                  (worthy of representing the member) can be sent (not a member
                  of any chapter). This is not considered as an absence. As per
                  the BNI Guideline, a member can look at having a maximum of 3
                  substitutions in a 6 months rolling period.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment3"
                      checked={commitmentSheet.agree3 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree3: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment3"
                      checked={commitmentSheet.agree3 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree3: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">4.</strong>{" "}
                  <span>
                    <BoldText text="Participation" />
                  </span>{" "}
                  -A member of BNI is required to participate in chapter
                  activities by:
                  <br />
                  <span>
                    1. Providing <BoldText text="referrals" />{" "}
                  </span>
                  <span className="ml-2">
                    2. Inviting <BoldText text="visitors" /> as per Chapter
                    goals{" "}
                  </span>
                  <span className="ml-2">
                    3. Contribute to running of the chapter (by taking on a
                    position or helping other members holding positions){" "}
                  </span>
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment4"
                      checked={commitmentSheet.agree4 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree4: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment4"
                      checked={commitmentSheet.agree4 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree4: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">5.</strong>{" "}
                  <span>
                    <BoldText text="Goal Oriented 1-2-1s" />
                  </span>{" "}
                  -I commit to conducting at least two goal oriented 1-2-1 with
                  fellow members of my chapter (after attending Member Success
                  Program) or as per the goals set by my chapter from time to
                  time.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment5"
                      checked={commitmentSheet.agree5 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree5: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment5"
                      checked={commitmentSheet.agree5 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree5: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">6.</strong>{" "}
                  <span>
                    <BoldText text="Visitors Day" />
                  </span>{" "}
                  -During Visitors day, every new member is required to send 40
                  (strictly) invitations to qualified prospects of BNI the first
                  time.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment6"
                      checked={commitmentSheet.agree6 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree6: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment6"
                      checked={commitmentSheet.agree6 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree6: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">7.</strong>{" "}
                  <span>
                    <BoldText text="Trainings" />
                  </span>{" "}
                  -BNI conducts 6-7 trainings in a year for its members. All
                  members are required to attend these trainings, and some
                  trainings like MSP must be attended within 60 days of
                  membership. Trainings are usually held on Saturdays and
                  approx. cost is around Rs. 1200/- (subject to change) payable
                  by cash.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment7"
                      checked={commitmentSheet.agree7 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree7: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment7"
                      checked={commitmentSheet.agree7 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree7: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">8.</strong>{" "}
                  <span>
                    <BoldText text="Meeting Fees" />
                  </span>{" "}
                  -I understand that in addition to the annual membership fees
                  (Non-refundable), I will also be required to pay quarterly
                  chapter dues in cash, in advance (Non-refundable). These are
                  due at the beginning of penultimate month for the succeeding
                  quarter in order to pay for the meeting venue. My chapter may
                  also have socials and other events that will be at an
                  additional cost.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment8"
                      checked={commitmentSheet.agree8 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree8: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment8"
                      checked={commitmentSheet.agree8 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree8: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">9.</strong> I will read and
                  abide by the{" "}
                  <span>
                    <BoldText text="Member Policies" />
                  </span>{" "}
                  Brochure and the{" "}
                  <span>
                    <BoldText text="BNI Code of Ethics" />
                  </span>
                  : I will provide the products and services at the prices I
                  quote. I agree to be truthful with BNI members and their
                  referrals. I will give high quality service as I expect others
                  to give me. I will take responsibility for following up
                  promptly on the referrals I receive. I will build goodwill and
                  trust among the members and their referrals. I will be
                  positive and supportive. I agree to maintain ethical standards
                  that are equal to or above that of the rest of my profession.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment9"
                      checked={commitmentSheet.agree9 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree9: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment9"
                      checked={commitmentSheet.agree9 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree9: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">10.</strong>{" "}
                  <span>
                    <BoldText text="Positivity" />
                  </span>{" "}
                  -I shall make only positive contributions to the chapter and
                  fellow members.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment10"
                      checked={commitmentSheet.agree10 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree10: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment10"
                      checked={commitmentSheet.agree10 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree10: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">11.</strong> I recognize
                  that I am getting involved with BNI and agree to follow the
                  system, and be coachable by the director/s.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment11"
                      checked={commitmentSheet.agree11 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree11: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment11"
                      checked={commitmentSheet.agree11 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree11: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">12.</strong> I understand
                  BNI or the chapter may set up processes and/or policies and/or
                  Goals in the chapter&apos;s course of operations and all
                  members would be required to follow the same.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment12"
                      checked={commitmentSheet.agree12 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree12: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment12"
                      checked={commitmentSheet.agree12 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree12: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
                <p className="mb-2">
                  <strong className="font-semibold">13.</strong> A joining
                  member should clearly identify and discuss the expectations
                  from BNI and the Chapter.
                  <div className="flex justify-end">
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment13"
                      checked={commitmentSheet.agree13 === true}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree13: true,
                        })
                      }
                    />
                    <label htmlFor="agree" className="font-semibold">
                      I Understand & Agree
                    </label>
                  </span>
                  <span>
                    <input
                      className="ml-2 scale-110 mr-2"
                      type="radio"
                      
                      name="commitment13"
                      checked={commitmentSheet.agree13 === false}
                      onChange={() =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          agree13: false,
                        })
                      }
                    />
                    <label htmlFor="disagree" className="font-semibold">
                      I Disagree
                    </label>
                  </span>
                  </div>
                </p>
              </section>
              <section className="pt-4">
                <BoldText text="Payment / Induction details:" />
                <div className="mt-2 mb-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:mb-2">
                  <div className="flex flex-col">
                    <label htmlFor="chequeNum">Cheque No:</label>
                    <input
                      className={`bg-white border-b ${
                        errors.chequeNum ? "border-red-500" : "border-black"
                      }  focus:outline-none leading-none w-full pl-1 font-semibold`}
                      id="chequeNum"
                      type="number"
                      value={commitmentSheet.chequeNum}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          chequeNum: e.target.value,
                        })
                      }
                    />
                    {errors.chequeNum && (
                      <span className="text-red-500 text-sm">
                        {errors.chequeNum}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="chequeDate">Payment Date:</label>
                    <input
                      className={`bg-white border-b border-black focus:outline-none pl-2 leading-none w-full font-semibold ${
                        errors.chequeDate ? "border-red-500" : ""
                      }`}
                      id="chequeDate"
                      type="date"
                      value={commitmentSheet.chequeDate}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          chequeDate: e.target.value,
                        })
                      }
                    />
                    {errors.chequeDate && (
                      <span className="text-red-500 text-sm">
                        {errors.chequeDate}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="bank">Bank:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="bank"
                      type="text"
                      value={commitmentSheet.bank}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          bank: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="neftNum">NEFT No:</label>
                    <input
                      className={`bg-white border-b ${
                        errors.neftNum ? "border-red-500" : "border-black"
                      } focus:outline-none leading-none w-full pl-1 font-semibold`}
                      id="neftNum"
                      type="number"
                      value={commitmentSheet.neftNum}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          neftNum: e.target.value,
                        })
                      }
                    />
                    {errors.neftNum && (
                      <span className="text-red-500 text-sm">
                        {errors.neftNum}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 mb-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:mb-2">
                  <div className="flex flex-col">
                    <label htmlFor="name">Name:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="name"
                      type="text"
                      value={commitmentSheet.name}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="date">Date:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="date"
                      type="date"
                      value={commitmentSheet.date}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="sign">Sign:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="sign"
                      type="text"
                    />
                  </div>
                </div>
                <div className="mt-2 mb-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:mb-2">
                  <div className="flex flex-col">
                    <label htmlFor="email">Email:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="email"
                      type="email"
                      value={commitmentSheet.email}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                      className={`bg-white border-b ${
                        errors.mobile ? "border-red-500" : "border-black"
                      }  focus:outline-none leading-none w-full pl-1 font-semibold`}
                      id="mobile"
                      type="number"
                      value={commitmentSheet.mobile}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          mobile: e.target.value,
                        })
                      }
                    />
                    {errors.mobile && (
                      <span className="text-red-500 text-sm">
                        {errors.mobile}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="category">Category:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="category"
                      type="text"
                      value={commitmentSheet.category}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          category: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-2 mb-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:mb-2">
                  <div className="flex flex-col">
                    <label htmlFor="sponsor">Sponsor:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="sponsor"
                      type="text"
                      value={commitmentSheet.sponsor}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          sponsor: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="gstin">GSTIN:</label>
                    <input
                      className={`bg-white border-b ${
                        errors.gstin ? "border-red-500" : "border-black"
                      } focus:outline-none leading-none w-full pl-1 font-semibold`}
                      id="gstin"
                      type="number"
                      value={commitmentSheet.gstin}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          gstin: e.target.value,
                        })
                      }
                    />
                    {errors.gstin && (
                      <span className="text-red-500 text-sm">
                        {errors.gstin}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 mb-1 grid grid-cols-12 sm:grid-cols-12 lg:grid-cols-1 gap-4 lg:mb-2">
                  <div className="flex flex-cols grid-cols-4">
                    <label className="mb-1" htmlFor="address">
                      Company Name & Address(in full):
                    </label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="address"
                      type="text"
                      value={commitmentSheet.address}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-2 mb-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:mb-2">
                  <div className="flex flex-col">
                    <label htmlFor="inductionDate">Induction Date:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                      id="inductiondate"
                      type="date"
                      value={commitmentSheet.inductionDate}
                      onChange={(e) =>
                        setCommitmentSheet({
                          ...commitmentSheet,
                          inductionDate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="signature">Signature of VP:</label>
                    <input
                      className="bg-white border-b border-black focus:outline-none pl-2 leading-none w-full"
                      id="signature"
                      type="text"
                    />
                  </div>
                </div>
              </section>
              <div className="flex justify-center items-center mt-2">
                <button
                  type="submit"
                  className=" text-white rounded-sm shadow-md my-3 px-6 py-2 bg-red-600 hover:bg-red-700 mr-5"
                >
                  Update
                </button>
                <button className=" text-white rounded-sm shadow-md my-3 px-6 py-2 bg-red-600 hover:bg-red-700">
                  <a
                    href="#"
                    onClick={() =>
                      openModal("https://bnipayments.nidmm.org/commitment.pdf")
                    }
                    className="text-white"
                  >
                    View & Submit
                  </a>
                </button>
              </div>
            </form>
          </main>
        </div>
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

export default CommitmentSheet;
