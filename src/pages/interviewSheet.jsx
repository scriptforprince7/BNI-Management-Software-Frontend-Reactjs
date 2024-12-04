import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Copyright from "../components/footer/copyright";
import Breadcrumb from "../components/breadcum/breadcrumb";
import BoldText from "../components/boldText";
const InterviewSheet = () => {
  const link = "interview-sheet";
  const [interviewSheet, setInterviewSheet] = useState({
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

  useEffect(() => {
    const { chequeNum, neftNum, gstin, mobile } = interviewSheet;
    const newErrors = {};

    if (interviewSheet.chequeDate) {
      const selectedDate = new Date(interviewSheet.chequeDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        setErrors((prev) => ({
          ...prev,
          chequeDate: "Cheque date cannot be in future",
        }));
      } else {
        setErrors((prev) => ({ ...prev, chequeDate: "" }));
      }
    }
    // Validate cheque number
    if (chequeNum && !/^\d{6}$/.test(chequeNum)) {
      newErrors.chequeNum = "Cheque number must be exactly 6 digits.";
    }

    // Validate NEFT number
    if (neftNum && !/^\d{16}$/.test(neftNum)) {
      newErrors.neftNum = "NEFT number must be exactly 16 digits.";
    }
    if (gstin && !/^\d{15}$/.test(gstin)) {
      newErrors.gstin = "GSTIN number must be exactly 15 digits.";
    }
    if (mobile && !/^\d{10}$/.test(mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }

    setErrors(newErrors);
  }, [interviewSheet]);

  const handleForm = (e) => {
    e.preventDefault();
    console.log(interviewSheet, interviewSheet.chequeDate);
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
                  value={interviewSheet.memberName}
                  onChange={(e) =>
                    setInterviewSheet({
                      ...interviewSheet,
                      memberName: e.target.value,
                    })
                  }
                />
                agree to the following terms and conditions as part of my
                membership in the
                <input
                  className="bg-white border-b border-black focus:outline-none leading-none w-full sm:w-auto pl-1 font-semibold"
                  type="text"
                  value={interviewSheet.chapter}
                  onChange={(e) =>
                    setInterviewSheet({
                      ...interviewSheet,
                      chapter: e.target.value,
                    })
                  }
                />{" "}
                chapter of BNI.
              </p>
            </section>
            <section>
              <p className="mb-2">
                1.{" "}
                <span>
                  <BoldText text="Time - Arrive latest by 7:29 AM Stay till 9:30 AM at least" />
                </span>
                - I understand the importance of arriving early each week prior
                to "Open Networking" so that I can help greet guests and network
                with the members. Therefore, I will arrive early each week and I
                will not leave early, as this is very disruptive to the meeting
                process.
              </p>
              <p className="mb-2">
                2.{" "}
                <span>
                  <BoldText text='Attendance -Only 3 Absence in 6 months "Rolling Period"' />
                </span>{" "}
                - I will attend every meeting and when I am unable to attend, I
                will send a substitute to take my place. I also understand my
                responsibility to fully brief my substitute on what they should
                say and how they are to behave while acting as my substitute.
              </p>
              <p className="mb-2">
                3.{" "}
                <span>
                  <BoldText text="Substitution" />
                </span>{" "}
                -If a member is unable to attend a meeting, a substitute (worthy
                of representing the member) can be sent (not a member of any
                chapter). This is not considered as an absence. As per the BNI
                Guideline, a member can look at having a maximum of 3
                substitutions in a 6 months rolling period.
              </p>
              <p className="mb-2">
                4.{" "}
                <span>
                  <BoldText text="Participation" />
                </span>{" "}
                -A member of BNI is required to participate in chapter
                activities by
                <br />
                <span>
                  1. Providing <BoldText text="referrals" />{" "}
                </span>
                <span>
                  2. Inviting <BoldText text="visitors" /> as per Chapter goals{" "}
                </span>
                <span>
                  3. Contribute to running of the chapter (by taking on a
                  position or helping other members holding positions){" "}
                </span>
              </p>
              <p className="mb-2">
                5.{" "}
                <span>
                  <BoldText text="Goal Oriented 1-2-1s" />
                </span>{" "}
                -I commit to conducting at least two goal oriented 1-2-1 with
                fellow members of my chapter (after attending Member Success
                Program) or as per the goals set by my chapter from time to
                time.
              </p>
              <p className="mb-2">
                6.{" "}
                <span>
                  <BoldText text="Visitors Day" />
                </span>{" "}
                -During Visitors day, every new member is required to send 40
                (strictly) invitations to qualified prospects of BNI the first
                time.
              </p>
              <p className="mb-2">
                7.{" "}
                <span>
                  <BoldText text="Trainings" />
                </span>{" "}
                -BNI conducts 6-7 trainings in a year for its members. All
                members are required to attend these trainings, and some
                trainings like MSP must be attended within 60 days of
                membership. Trainings are usually held on Saturdays and approx.
                cost is around Rs. 1200/- (subject to change) payable by cash.
              </p>
              <p className="mb-2">
                8.{" "}
                <span>
                  <BoldText text="Meeting Fees" />
                </span>{" "}
                -I understand that in addition to the annual membership fees
                (Non-refundable), I will also be required to pay quarterly
                chapter dues in cash, in advance (Non-refundable). These are due
                at the beginning of penultimate month for the succeeding quarter
                in order to pay for the meeting venue. My chapter may also have
                socials and other events that will be at an additional cost.
              </p>
              <p className="mb-2">
                9. I will read and abide by the{" "}
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
                to give me. I will take responsibility for following up promptly
                on the referrals I receive. I will build goodwill and trust
                among the members and their referrals. I will be positive and
                supportive. I agree to maintain ethical standards that are equal
                to or above that of the rest of my profession.
              </p>
              <p className="mb-2">
                10.{" "}
                <span>
                  <BoldText text="Positivity" />
                </span>{" "}
                -I shall make only positive contributions to the chapter and
                fellow members.
              </p>
              <p className="mb-2">
                11. I recognize that I am getting involved with BNI and agree to
                follow the system, and be coachable by the director/s.
              </p>
              <p className="mb-2">
                12. I understand BNI or the chapter may set up processes and/or
                policies and/or Goals in the chapter&apos;s course of operations
                and all members would be required to follow the same.
              </p>
              <p className="mb-2">
                13. A joining member should clearly identify and discuss the
                expectations from BNI and the Chapter.
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
                    value={interviewSheet.chequeNum}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                  <label htmlFor="chequeDate">Date:</label>
                  <input
                    className={`bg-white border-b border-black focus:outline-none pl-2 leading-none w-full font-semibold ${
                      errors.chequeDate ? "border-red-500" : ""
                    }`}
                    id="chequeDate"
                    type="date"
                    value={interviewSheet.chequeDate}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.bank}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.neftNum}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.name}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.date}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.email}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.mobile}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.category}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.sponsor}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.gstin}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
                        gstin: e.target.value,
                      })
                    }
                  />
                  {errors.gstin && (
                    <span className="text-red-500 text-sm">{errors.gstin}</span>
                  )}
                </div>
              </div>
              <div className="mt-2 mb-1 grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:mb-2">
                <div className="flex flex-cols grid-cols-4">
                  <label className=" whitespace-nowrap mb-1" htmlFor="address">
                    Company Name & Address(in full):
                  </label>
                  <input
                    className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
                    id="address"
                    type="text"
                    value={interviewSheet.address}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
                    value={interviewSheet.inductionDate}
                    onChange={(e) =>
                      setInterviewSheet({
                        ...interviewSheet,
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
              <a href="#" onClick={() => openModal("https://bnipayments.nidmm.org/commitment.pdf")} className="text-white">View & Submit</a>
              </button>
            </div>
          </form>
        </main>
      </div>
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
