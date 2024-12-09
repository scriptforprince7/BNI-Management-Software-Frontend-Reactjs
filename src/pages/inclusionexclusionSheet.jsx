import React from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Copyright from "../components/footer/copyright";
import Breadcrumb from "../components/breadcum/breadcrumb";
import { useState, useEffect } from "react";
import baseUrl from "../utils/baseurl";
import LoaderImg from "../components/loading/loading";

const InclusionexclusionSheet = () => {
  const link = "inclusionexclusion-sheet";
  const [inclusionexclusionSheet, setInclusionexlusionSheet] = useState({
    memberName: "",
    chapter: "",
    category: "",
    date: "",
    areaOfExpertise: "",
    classificationExcludes: "",
    signature: "",
    vpSign: "",
    confirmation1:"",
    confirmation2:"",
    confirmation3:"",
    confirmation4:"",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for UX feedback
  const [chapterData, setChapterData] = useState([]);
  const [error, setError] = useState(null);

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(inclusionexclusionSheet);

    try {
      setLoading(true); // Start loading
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        body: JSON.stringify(inclusionexclusionSheet),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setModalContent("Form submitted successfully!");
        setInclusionexlusionSheet({
          memberName: "",
          chapter: "",
          category: "",
          date: "",
        });
      } else {
        setModalContent(data.message || "An error occurred. Please try again.");
      }
      setModalOpen(true); // Show modal feedback
    } catch (error) {
      console.error(error);
      setModalContent("An unexpected error occurred. Please try again later.");
      setModalOpen(true); // Show error feedback
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const fetchChapters = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseUrl}/api/chapters`);
        if (!response.ok) {
          throw new Error("Failed to fetch chapters");
        }
        const data = await response.json();
        console.log(data);
        setChapterData(data);
        console.log(inclusionexclusionSheet);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

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
                , agree to the following terms and conditions of my
                classification of my membership in the{" "}
                <select
                  id="chapter"
                  value={inclusionexclusionSheet.chapter}
                  onChange={(e) =>
                    setInclusionexlusionSheet((prev) => ({
                      ...prev,
                      chapter: e.target.value,
                    }))
                  }
                  className="bg-white border-b border-black focus:outline-none leading-none pl-1 font-semibold mr-2 mt-2"
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
                chapter of BNI NEW Delhi.
              </p>
              <div className="flex">
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
                  className="bg-white border-b border-black focus:outline-none leading-none pl-1 font-semibold ml-2"
                />
              </div>
            </section>

            <section className="mb-6 space-y-4">
              <div className="flex items-start">
                <span className="font-bold mr-2">1.</span>
                <p>
                  I confirm that I&apos;ve opted for the{" "}
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
                  <span className="font-semibold ml-5">
                  <input
                    className="ml-2 scale-110"
                    type="checkbox"
                    checked={inclusionexclusionSheet.confirmation1}
                    onChange={(e) =>
                      setInclusionexlusionSheet({
                        ...inclusionexclusionSheet,
                        confirmation1: e.target.checked,
                      })
                    }
                  />
                  </span>
                  
                </p>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-2">2.</span>
                <p>
                  I confirm that the BNI Classification I have chosen is my
                  primary business.
                </p>
                <span className="font-semibold ml-5">
                  <input
                    className="ml-2 scale-110"
                    type="checkbox"
                    checked={inclusionexclusionSheet.confirmation2}
                    onChange={(e) =>
                      setInclusionexlusionSheet({
                        ...inclusionexclusionSheet,
                        confirmation2: e.target.checked,
                      })
                    }
                  />
                  </span>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-2">3.</span>
                <p>
                  I confirm that I will not represent any other vertical of my
                  business or my family member&apos;s business in the chapter or
                  in 1-2-1&apos;s or in any BNI premises.
                </p>
                <span className="font-semibold ml-5">
                  <input
                    className="ml-2 scale-110"
                    type="checkbox"
                    checked={inclusionexclusionSheet.confirmation3}
                    onChange={(e) =>
                      setInclusionexlusionSheet({
                        ...inclusionexclusionSheet,
                        confirmation3: e.target.checked,
                      })
                    }
                  />
                  </span>
              </div>
              <div className="flex items-start">
                <span className="font-bold mr-2">4.</span>
                <p>
                  I confirm that I&apos;ll be truthful to members about my
                  classification and will do business with BNI members
                  truthfully representing only my BNI classification.
                </p>
                <span className="font-semibold ml-5">
                  <input
                    className="ml-2 scale-110"
                    type="checkbox"
                    checked={inclusionexclusionSheet.confirmation4}
                    onChange={(e) =>
                      setInclusionexlusionSheet({
                        ...inclusionexclusionSheet,
                        confirmation4: e.target.checked,
                      })
                    }
                  />
                  </span>
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
                  rows="2"
                  className="bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 font-semibold"
                  value={inclusionexclusionSheet.areaOfExpertise}
                  onChange={(e) =>
                    setInclusionexlusionSheet({
                      ...inclusionexclusionSheet,
                      areaOfExpertise: e.target.value,
                    })
                  }
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
                  rows="2"
                  className="bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 font-semibold"
                  value={inclusionexclusionSheet.classificationExcludes}
                  onChange={(e) =>
                    setInclusionexlusionSheet({
                      ...inclusionexclusionSheet,
                      classificationExcludes: e.target.value,
                    })
                  }
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
                  className="bg-white border-b border-black focus:outline-none leading-none w-full font-semibold"
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
                  className="bg-white border-b border-black focus:outline-none leading-none w-full font-semibold"
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
                  className="bg-white border-b border-black focus:outline-none leading-none w-full font-semibold"
                  value={inclusionexclusionSheet.signature}
                  onChange={(e) =>
                    setInclusionexlusionSheet({
                      ...inclusionexclusionSheet,
                      signature: e.target.value,
                    })
                  }
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
                  className="bg-white border-b border-black focus:outline-none leading-none w-full mt-1 font-semibold"
                  value={inclusionexclusionSheet.memberName}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="vpApproval"
                  className="text-sm font-medium text-gray-700"
                >
                  Approved: Vice President&apos;s Name and Signature
                </label>
                <input
                  id="vpApproval"
                  type="text"
                  className="bg-white border-b border-black focus:outline-none leading-none w-full mt-1 font-semibold"
                  value={inclusionexclusionSheet.vpSign}
                  onChange={(e) =>
                    setInclusionexlusionSheet({
                      ...inclusionexclusionSheet,
                      vpSign: e.target.value,
                    })
                  }
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

export default InclusionexclusionSheet;
