import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addQuizApi } from "../api/quiz.api"; // Make sure this API accepts courseId and quizData

function CreateQuiz({ courses }) {
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState({
    title: "",
    course: "",
    subject: "",
    level: "",
    questions: [{ question: "", options: ["", "", "", ""], answer: "" }],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    if (field === "question") updatedQuestions[index].question = value;
    else if (field.startsWith("option")) {
      const optionIndex = parseInt(field.split("-")[1]);
      updatedQuestions[index].options[optionIndex] = value;
    } else if (field === "answer") updatedQuestions[index].answer = value;
    setQuizData((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setQuizData((prev) => ({
      ...prev,
      questions: [...prev.questions, { question: "", options: ["", "", "", ""], answer: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quizData.course) {
      alert("Please select a course.");
      return;
    }

    setLoading(true);
    try {
      // Use the correct API function
      await addQuizApi(quizData.course, quizData);
    //   alert("Quiz submitted successfully!");
      navigate("../quiz"); // redirect to dashboard
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("Failed to submit quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-indigo-800 mb-4">Create Quiz</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quiz Title */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={quizData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Course</label>
            <select
              name="course"
              value={quizData.course}
              onChange={(e) => {
                const selectedCourse = courses.find((c) => c._id === e.target.value);
                setQuizData((prev) => ({
                  ...prev,
                  course: selectedCourse._id,
                  subject: selectedCourse.subject,
                  level: selectedCourse.level,
                }));
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            >
              <option value="">Select Course</option>
              {courses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.subject} - Level {c.level} ({c.faculty})
                </option>
              ))}
            </select>
          </div>

          {/* Subject & Level */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Subject</label>
              <input
                type="text"
                value={quizData.subject}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Level</label>
              <input
                type="text"
                value={quizData.level}
                disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Questions */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Questions</label>
            {quizData.questions.map((q, idx) => (
              <div key={idx} className="mb-4 border p-3 rounded-md">
                <input
                  type="text"
                  placeholder={`Question ${idx + 1}`}
                  value={q.question}
                  onChange={(e) => handleQuestionChange(idx, "question", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 mb-2"
                  required
                />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  {q.options.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleQuestionChange(idx, `option-${i}`, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1"
                      required
                    />
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.answer}
                  onChange={(e) => handleQuestionChange(idx, "answer", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-2 py-1"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addQuestion}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-200"
            >
              + Add Question
            </button>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } text-white font-semibold py-3 px-6 rounded-md transition-all duration-200`}
            >
              {loading ? "Submitting..." : "Submit Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;
