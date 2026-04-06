import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

const ResumeCard = ({ resume }: { resume: any }) => {
    return (
        <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {resume.company && <h2 className="!text-black font-bold break-words">{resume.company}</h2>}
                    {resume.job_title && <h3 className="text-lg break-words text-gray-500">{resume.job_title}</h3>}
                    {!resume.company && !resume.job_title && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={resume.score || 0} />
                </div>
            </div>
            <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-2xl flex-1">
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">AI Feedback</p>
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">{resume.feedback}</p>
                <div className="mt-auto pt-4 border-t border-gray-200">
                    <p className="text-sm text-blue-500 font-medium">View full review →</p>
                </div>
            </div>
        </Link>
    );
};

export default ResumeCard;