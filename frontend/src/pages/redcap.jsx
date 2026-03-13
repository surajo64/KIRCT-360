import React from "react";
import { Video, ClipboardList, Send, KeyRound, HelpCircle } from "lucide-react";

const Redcap = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-800 mb-2 border-b-4 border-red-600 inline-block pb-1">
          Getting Free Access to KIRCT REDCap
        </h1>
        <p className="text-gray-700 mt-2">
          REDCap (Research Electronic Data Capture) is a secure web application
          designed to build and manage online surveys and databases. If you are
          a researcher looking to utilize REDCap for your project, follow the
          steps below to apply for free access.
        </p>

        {/* Step 1 */}
        <div className="mt-8 space-y-2">
          <StepCard
            step="Step 1"
            title="Watch the Required Training Videos"
            icon={<Video className="text-blue-600 w-6 h-6" />}
            color="blue"
          >
            <p className="text-gray-700">
              Before applying for REDCap access, familiarize yourself by watching
              the provided training videos. These materials will guide you on
              creating and managing your data collection tool efficiently.
            </p>
            <a
              href="https://redcap-kirct.org/index.php?action=training"
              className="inline-block mt-3 text-blue-700 font-semibold hover:underline"
            >
              🎥 Click to Watch!
            </a>
          </StepCard>

          {/* Step 2 */}
          <StepCard
            step="Step 2"
            title="Complete the Application Form"
            icon={<ClipboardList className="text-red-600 w-6 h-6" />}
            color="red"
          >
            <p className="text-gray-700 mb-2">
              After completing the training, fill out the{" "}
              <strong>KIRCT REDCap Access Request Form</strong> with the
              following details:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Project/Research Title</li>
              <li>Principal Investigator’s Name</li>
              <li>IRB/REC Approval Number (if applicable)</li>
              <li>Additional project-related details</li>
            </ul>
            <a
              href="https://redcap.link/REDCapaccess"
              className="inline-block mt-3 text-red-700 font-semibold hover:underline"
            >
              📝 Click to Apply
            </a>
          </StepCard>

          {/* Step 3 */}
          <StepCard
            step="Step 3"
            title="Submit Your Application"
            icon={<Send className="text-blue-600 w-6 h-6" />}
            color="blue"
          >
            <p className="text-gray-700">
              Once the form is completed, submit it as instructed. Your
              application will be reviewed, and if approved, you’ll receive your
              access credentials via email.
            </p>
          </StepCard>

          {/* Step 4 */}
          <StepCard
            step="Step 4"
            title="Receive Login Credentials"
            icon={<KeyRound className="text-red-600 w-6 h-6" />}
            color="red"
          >
            <p className="text-gray-700 mb-2">
              If approved, you’ll receive two emails:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>
                <strong>First Email:</strong> Contains your username and a link
                to create a password.
              </li>
              <li>
                <strong>Second Email:</strong> Grants access to your project
                design page.
              </li>
            </ul>
          </StepCard>

          {/* Support Section */}
          <div className="mt-10 bg-blue-50 border-l-4 border-blue-700 p-4 rounded-lg flex items-start gap-3">
            <HelpCircle className="text-blue-700 w-6 h-6 flex-shrink-0" />
            <p className="text-gray-700">
              If you encounter any issues during the process, please reach out
              to the <strong>REDCap Support Team</strong> for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ step, title, icon, children, color }) => (
  <div
    className={`bg-white border-l-4 border-${color}-700 rounded-xl shadow-sm hover:shadow-md transition p-5`}
  >
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h2 className="text-lg font-semibold text-blue-800">
        {step}: {title}
      </h2>
    </div>
    <div className="text-sm leading-relaxed">{children}</div>
  </div>
);

export default Redcap;
