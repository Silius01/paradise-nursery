import Gallery from '../components/Gallery'

export default function GalleryPage() {
  return (
    <div className="page">
      <section className="band page-top">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">The Portfolio</p>
            <h2>Every burst is one we designed and fired.</h2>
            <p>
              Filter by the kind of night you&apos;re planning. Full shows open in the reel — this
              preview uses placeholder art in the concept build.
            </p>
          </div>
          <Gallery />
        </div>
      </section>
    </div>
  )
}
