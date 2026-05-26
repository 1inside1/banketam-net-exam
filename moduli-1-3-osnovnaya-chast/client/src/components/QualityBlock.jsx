export default function QualityBlock() {
  return (
    <section className="rounded-xl overflow-hidden border border-banquet-peach shadow-card animate-fade-up">
      <img
        src="/quality_img/quality.webp"
        alt="Качество банкетного обслуживания"
        className="w-full h-36 object-cover"
      />
      <div className="p-4 bg-white">
        <h3>Качество сервиса</h3>
        <p className="text-sm mt-2 leading-relaxed">
          Каждый банкет — продуманное меню, аккуратная сервировка и команда, которая заботится о гостях.
        </p>
      </div>
    </section>
  )
}
