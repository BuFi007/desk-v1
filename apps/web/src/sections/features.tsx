import Marquee from 'react-fast-marquee'

export default function Features() {
const feature = [
  {
    title: "Cross-border Payments",
    text: "Send money globally with reduced fees and enhanced security through our stablecoin-powered payment network."
  },
  {
    title: "Privacy-First Design",
    text: "Enjoy complete financial privacy with zk-proof encryption ensuring only you have access to sensitive information."
  },
  {
    title: "Project Management",
    text: "Keep track of finances and collaborate with teams using our enterprise-grade toolkit and smart contract integration."
  },
  {
    title: "DeFi Services",
    text: "Access lending, borrowing, and advanced financial tools through our intuitive DeFi platform."
  },
  {
    title: "Stablecoin Solutions",
    text: "Protect your savings from inflation with easy-to-use stablecoin services and capital access."
  },
  {
    title: "AI-Powered Tools",
    text: "Leverage artificial intelligence for smarter financial planning and automated accounting solutions."
  }
]

  const features = Array.from({ length: 6 }, () => ({ ...feature }))

  return (
    <div>
      <section className="border-t-border dark:border-t-darkBorder dark:bg-darkBg border-t-2 bg-bg py-20 font-base lg:py-[100px]">
        <h2 className="mb-14 px-5 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Our Features |  Making crypto finance friendly 👻
        </h2>

        <div className="mx-auto grid w-container max-w-full grid-cols-1 gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            return (
              <div
                className="border-border dark:border-darkBorder dark:bg-secondaryBlack shadow-light dark:shadow-dark flex flex-col gap-3 rounded-base border-2 bg-white p-5"
                key={feature[i].title}
              >
                <h4 className="text-xl font-heading">
                  {feature[i].title}
                </h4>
                <p>{feature[i].text}</p>
              </div>
            )
          })}
        </div>
      </section>
      <div>
        <Marquee
          className="border-y-border dark:border-y-darkBorder dark:border-darkBorder dark:bg-secondaryBlack border-y-2 bg-white py-3 font-base sm:py-5"
          direction="left"
        >
          {Array(10)
            .fill('xd')
            .map((x, id) => {
              return (
                <div className="flex items-center" key={id}>
                  <span className="mx-8 text-xl font-heading sm:text-2xl lg:text-4xl">
                    Spooky no more 👻
                  </span>
                </div>
              )
            })}
        </Marquee>
      </div>
    </div>
  )
}
