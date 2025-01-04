import PricingPlan from "@/components/pricing-plan";

export default function Pricing() {
  return (
    <section className="border-b-border dark:border-b-darkBorder dark:bg-secondaryBlack inset-0 flex w-full flex-col items-center justify-center border-b-2 bg-white bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:70px_70px] font-base">
      <div className="mx-auto w-container max-w-full px-5 py-20 lg:py-[100px]">
        <h2 className="mb-14 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
          Pricing
        </h2>
        <div className="grid grid-cols-3 gap-8 w900:mx-auto w900:w-2/3 w900:grid-cols-1 w500:w-full">
          <PricingPlan
            planName="Freelancer"
            description="Perfect for independent professionals"
            price="9.99"
            perks={[
              "Cross-border payments",
              "Basic invoicing tools",
              "Project management lite",
              "Standard support",
            ]}
          />
          <PricingPlan
            planName="Business"
            description="Ideal for growing teams"
            price="29.99"
            perks={[
              "Unlimited transactions",
              "Advanced DeFi tools",
              "Team collaboration features",
              "Priority support",
              "Custom invoicing",
            ]}
            mostPopular
          />
          <PricingPlan
            planName="Enterprise"
            description="For established organizations"
            price="99.99"
            perks={[
              "Custom payment solutions",
              "Advanced analytics",
              "Dedicated account manager",
              "API access",
              "Custom integrations",
              "Enhanced security features",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
