export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <img src="/social/social.png" alt="" className="h-7 w-7 object-contain opacity-90" />
      <img src="/social/soc.png" alt="" className="h-7 w-7 object-contain opacity-90" />
      <img src="/social/social.jpg" alt="" className="h-7 w-7 object-contain rounded-full opacity-90" />
    </div>
  )
}
