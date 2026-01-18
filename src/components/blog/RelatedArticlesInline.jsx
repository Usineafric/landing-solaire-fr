import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { getCategoryName } from "../../data/blogData";

export default function RelatedArticlesInline({ articles = [] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <div className="my-10 bg-gray-50 border border-gray-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-orange-500" />
        <h4 className="font-bold text-gray-900">A lire aussi</h4>
      </div>

      <div className="grid gap-3">
        {articles.slice(0, 3).map((article) => (
          <Link
            key={article.id}
            to={`/blog/${article.id}`}
            className="flex items-center gap-4 p-3 bg-white rounded-xl hover:bg-orange-50 transition-colors group border border-gray-100"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs text-orange-600 font-semibold">
                {getCategoryName(article.category)}
              </span>
              <h5 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                {article.title}
              </h5>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-500 flex-shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
