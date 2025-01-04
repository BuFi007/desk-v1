import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Marquee from "react-fast-marquee";

export default function Faq() {
	return (
		<div>
			<section className=" dark:bg-darkBg bg-bg py-20 font-base lg:py-[100px]">
				<h2 className="mb-14 px-5 text-center text-2xl font-heading md:text-3xl lg:mb-20 lg:text-4xl">
					Frequently asked questions
				</h2>

				<div className="mx-auto grid w-[700px] max-w-full px-5">
					<Accordion className="text-base sm:text-lg" type="single" collapsible>
						<AccordionItem className="mb-2" value="item-1">
							<AccordionTrigger>What is Bu.fi?</AccordionTrigger>
							<AccordionContent>
								Bu.fi is a cutting-edge financial platform that combines
								traditional banking with blockchain technology, offering secure
								cross-border payments, DeFi services, and financial management
								tools for freelancers and businesses.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem className="mb-2" value="item-2">
							<AccordionTrigger>
								How does Bu.fi protect my privacy?
							</AccordionTrigger>
							<AccordionContent>
								Bu.fi employs state-of-the-art encryption and security protocols
								to safeguard your personal and financial information, including
								Zk-proofs for the most sensitive data. We adhere to strict data
								protection regulations and use advanced AI-driven fraud
								detection systems to prevent unauthorized access.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem className="mb-2" value="item-3">
							<AccordionTrigger>
								What are stablecoins and how do they work?
							</AccordionTrigger>
							<AccordionContent>
								Stablecoins are digital currencies pegged to stable assets like
								USD. Bu.fi makes it easy to use stablecoins for protecting your
								savings from inflation and accessing global financial services.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-4">
							<AccordionTrigger>
								Is Bu.fi available in my country?
							</AccordionTrigger>
							<AccordionContent>
								Bu.fi focuses on serving global markets with special attention
								to emerging markets. Our platform is designed to work across
								borders while maintaining compliance with local regulations.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</section>
			<div>
				<Marquee
					className="border-y-border dark:border-y-darkBorder dark:border-darkBorder dark:bg-secondaryBlack border-y-2 bg-white py-3 font-base sm:py-5"
					direction="right"
				>
					{Array(10)
						.fill("xd")
						.map((x, id) => {
							return (
								<div className="flex items-center" key={id as number}>
									<span className="mx-8 text-xl font-heading sm:text-2xl lg:text-4xl">
										What is Bu.fi?
									</span>
								</div>
							);
						})}
				</Marquee>
			</div>
		</div>
	);
}
