import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Copyright from "../components/footer/copyright";
import Breadcrumb from "../components/breadcum/breadcrumb";
import { useState } from "react";

const InclusionexclusionSheet = () => {
  const link = "inclusionexclusion-sheet";
  const [inclusionexclusionSheet, setInclusionexlusionSheet] = useState({
    memberName: "",
    chapter: "",
    category: "",
    date: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    console.log(inclusionexclusionSheet);
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
      <main className="border-none rounded-lg shadow-lg  sm:mx-10 md:mx-20 lg:mx-40 my-5 px-5 py-4">
        <div>
          <h1 className="text-center text-2xl sm:text-3xl pb-2 font-bold">
            INCLUSION & EXCLUSION SHEET
          </h1>
        </div>
        <form onSubmit={handleForm} className="p-4">
          <section className="mb-6">
            <p className="font-bold mb-4">
              I,{" "}
              <input
                className="bg-white border-b border-black focus:outline-none leading-none w-full sm:w-auto"
                type="text"
                value={inclusionexclusionSheet.memberName}
                onChange={(e) =>
                  setInclusionexlusionSheet({
                    ...inclusionexclusionSheet,
                    memberName: e.target.value,
                  })
                }
              />
              , agree to the following terms and conditions of my classification
              of my membership in the{" "}
              <input
                className="bg-white border-b border-black focus:outline-none leading-none w-full sm:w-auto"
                type="text"
                value={inclusionexclusionSheet.chapter}
                onChange={(e) =>
                  setInclusionexlusionSheet({
                    ...inclusionexclusionSheet,
                    chapter: e.target.value,
                  })
                }
              />{" "}
              chapter of BNI NEW Delhi.
            </p>
            <div className="flex flex-col">
              <label
                htmlFor="classification"
                className="text-sm font-medium text-gray-700"
              >
                BNI Classification:
              </label>
              <input
                id="classification"
                type="text"
                value={inclusionexclusionSheet.category}
                onChange={(e) =>
                  setInclusionexlusionSheet({
                    ...inclusionexclusionSheet,
                    category: e.target.value,
                  })
                }
                className="bg-white border-b border-black focus:outline-none leading-none w-full pl-1 font-semibold"
              />
            </div>
          </section>

          <section className="mb-6 space-y-4">
            <div className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <p>
                I confirm that I've opted for the{" "}
                <input
                  className="bg-white border-b border-black focus:outline-none leading-none w-full sm:w-auto pl-1 font-semibold"
                  type="text"
                  value={inclusionexclusionSheet.category}
                  onChange={(e) =>
                    setInclusionexlusionSheet({
                      ...inclusionexclusionSheet,
                      category: e.target.value,
                    })
                  }
                />{" "}
                classification to represent my business in BNI{" "}
                <input
                  className="bg-white border-b border-black focus:outline-none leading-none w-full sm:w-auto pl-1 font-semibold"
                  type="text"
                  value={inclusionexclusionSheet.chapter}
                  onChange={(e) =>
                    setInclusionexlusionSheet({
                      ...inclusionexclusionSheet,
                      chapter: e.target.value,
                    })
                  }
                />{" "}
                chapter.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <p>
                I confirm that the BNI Classification I have chosen is my
                primary business.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <p>
                I confirm that I will not represent any other vertical of my
                business or my family member’s business in the chapter or in
                1-2-1's or in any BNI premises.
              </p>
            </div>
            <div className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <p>
                I confirm that I'll be truthful to members about my
                classification and will do business with BNI members truthfully
                representing only my BNI classification.
              </p>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="expertise"
                className="text-sm font-medium text-gray-700"
              >
                My area of expertise includes:
              </label>
              <textarea
                id="expertise"
                rows="3"
                className="bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="excludes"
                className="text-sm font-medium text-gray-700"
              >
                I understand and confirm that my classification excludes:
              </label>
              <textarea
                id="excludes"
                rows="3"
                className="bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2"
              />
            </div>
          </section>

          <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                value={inclusionexclusionSheet.memberName}
                onChange={(e) =>
                  setInclusionexlusionSheet({
                    ...inclusionexclusionSheet,
                    memberName: e.target.value,
                  })
                }
                className="bg-white border-b border-black focus:outline-none leading-none w-full"
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
                value={inclusionexclusionSheet.date}
                onChange={(e) =>
                  setInclusionexlusionSheet({
                    ...inclusionexclusionSheet,
                    date: e.target.value,
                  })
                }
                className="bg-white border-b border-black focus:outline-none leading-none w-full"
              />
            </div>
          </section>

          <section className="mb-6">
            <div className="flex flex-col">
              <label
                htmlFor="signature"
                className="text-sm font-medium text-gray-700"
              >
                Signature:
              </label>
              <input
                id="signature"
                type="text"
                className="bg-white border-b border-black focus:outline-none leading-none w-full"
              />
            </div>
          </section>

          <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="mcomApproval"
                className="text-sm font-medium text-gray-700"
              >
                Approved: MCOM Member Name and Signature
              </label>
              <input
                id="mcomApproval"
                type="text"
                className="bg-white border-b border-black focus:outline-none leading-none w-full"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="vpApproval"
                className="text-sm font-medium text-gray-700"
              >
                Approved: Vice President’s Name and Signature
              </label>
              <input
                id="vpApproval"
                type="text"
                className="bg-white border-b border-black focus:outline-none leading-none w-full"
              />
            </div>
          </section>

          <div className="flex justify-center items-center mt-2">
            <button
              type="submit"
              className=" text-white rounded-sm shadow-md px-6 py-2 bg-red-600 hover:bg-red-700 mr-5"
            >
              Update
            </button>
            <button className=" text-white rounded-sm shadow-md my-3 px-6 py-2 bg-red-600 hover:bg-red-700">
              <a
                href="#"
                onClick={() =>
                  openModal("https://bnipayments.nidmm.org/inesheet.pdf")
                }
                className="text-white"
              >
                View & Submit
              </a>
            </button>
          </div>
        </form>
      </main>
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

export default InclusionexclusionSheet;
