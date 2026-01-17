import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User, Share2 } from "lucide-react";
import { getBlogPost, getRecentPosts } from "../data/blogData";
import Header from "../components/Header";
import SEO from "../components/SEO";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const recentPosts = getRecentPosts(3).filter(p => p.id !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Simple markdown-like rendering
  const renderContent = (content) => {
    return content
      .split('\n')
      .map((line, i) => {
        // Headers
        if (line.startsWith('### ')) {
          return <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-4">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-10 mb-6">{line.replace('## ', '')}</h2>;
        }
        // Lists
        if (line.startsWith('- **')) {
          const match = line.match(/- \*\*(.+?)\*\*\s*:?\s*(.*)/);
          if (match) {
            return (
              <li key={i} className="mb-2 text-gray-700 font-light">
                <strong className="font-semibold">{match[1]}</strong>
                {match[2] && `: ${match[2]}`}
              </li>
            );
          }
        }
        if (line.startsWith('- ')) {
          return <li key={i} className="mb-2 text-gray-700 font-light">{line.replace('- ', '')}</li>;
        }
        // Bold text
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-semibold text-gray-900 mt-4">{line.replace(/\*\*/g, '')}</p>;
        }
        // Tables
        if (line.startsWith('|')) {
          return null; // Handle tables separately
        }
        // Paragraphs
        if (line.trim()) {
          const formatted = line
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>');
          return <p key={i} className="text-gray-700 font-light leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />;
        }
        return null;
      });
  };

  return (
    <>
      <SEO
        title={`${post.title} | Le Panneau Solaire`}
        description={post.excerpt}
        image={post.image}
      />
      <Header />

      <div className="min-h-screen bg-white">
        {/* Header avec retour */}
        <div className="bg-gray-900 py-4 border-b border-gray-800">
          <div className="container-page">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Retour au blog</span>
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-page">
            <div className="max-w-4xl mx-auto">
              {/* Category */}
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  <Tag className="w-4 h-4" />
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-500 font-light">
                  <Clock className="w-4 h-4" />
                  {post.readTime} de lecture
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              {/* Featured Image */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container-page">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="prose prose-lg max-w-none">
                    {renderContent(post.content)}
                  </div>

                  {/* CTA Box */}
                  <div className="mt-12 bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Vous souhaitez passer au solaire ?
                    </h3>
                    <p className="text-gray-700 font-light mb-6">
                      Obtenez une etude personnalisee gratuite et sans engagement pour votre projet.
                    </p>
                    <Link
                      to="/#form"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      Demander mon etude gratuite
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                  {/* Share */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2 text-gray-600 font-medium">
                        <Share2 className="w-5 h-5" />
                        Partager
                      </span>
                      <button
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                      >
                        Copier le lien
                      </button>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">
                      Articles recents
                    </h4>
                    <div className="space-y-4">
                      {recentPosts.slice(0, 2).map(recentPost => (
                        <Link
                          key={recentPost.id}
                          to={`/blog/${recentPost.id}`}
                          className="block p-4 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
                        >
                          <span className="text-xs text-orange-600 font-semibold">{recentPost.category}</span>
                          <h5 className="text-sm font-semibold text-gray-900 mt-1 line-clamp-2">
                            {recentPost.title}
                          </h5>
                        </Link>
                      ))}
                    </div>

                    {/* Mini CTA */}
                    <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl text-white">
                      <h4 className="font-bold mb-2">Etude gratuite</h4>
                      <p className="text-sm text-gray-300 font-light mb-4">
                        Calculez vos economies
                      </p>
                      <Link
                        to="/#form"
                        className="block text-center bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition-transform"
                      >
                        Demarrer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
