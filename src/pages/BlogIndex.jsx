import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "../data/blogData";
import Header from "../components/Header";
import SEO from "../components/SEO";

export default function BlogIndex() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [...new Set(blogPosts.map(post => post.category))];

  return (
    <>
      <SEO
        title="Blog - Panneaux Solaires | Le Panneau Solaire"
        description="Conseils, guides et actualites sur les panneaux solaires : prix, aides, rentabilite, installation. Tout savoir pour votre projet photovoltaique."
      />
      <Header />

      <div className="min-h-screen bg-white">
        {/* Header avec retour */}
        <div className="bg-gray-900 py-4 border-b border-gray-800">
          <div className="container-page">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Retour a l'accueil</span>
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container-page">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                Blog & Actualites
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                Tout savoir sur
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mt-2">
                  le solaire
                </span>
              </h1>

              <p className="text-xl text-gray-600 font-light leading-relaxed">
                Guides pratiques, conseils d'experts et actualites pour reussir
                votre projet de panneaux solaires.
              </p>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-gray-200">
          <div className="container-page">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-gray-500 font-light mr-2">Categories :</span>
              {categories.map(category => (
                <span
                  key={category}
                  className="px-4 py-2 bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 rounded-full text-sm font-medium transition-colors cursor-pointer"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container-page">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map(post => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:shadow-xl hover:border-orange-200 transition-all group"
                >
                  {/* Image */}
                  <Link to={`/blog/${post.id}`} className="block overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category & Read Time */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 font-light">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 font-light text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1 text-xs text-gray-500 font-light">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                      >
                        Lire
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Pret a passer au solaire ?
              </h2>
              <p className="text-gray-300 font-light mb-8">
                Obtenez une etude personnalisee gratuite et sans engagement.
              </p>
              <Link
                to="/#form"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Demander mon etude gratuite
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
