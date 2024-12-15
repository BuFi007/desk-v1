// "use client";

// import { HtmlTemplate } from "@bu/invoice/templates/html";
// import InvoiceToolbar from "@/components/invoice-toolbar";
// import peanut from "@squirrel-labs/peanut-sdk";
// import { PEANUTAPIKEY } from "@/constants/Env";
// import InvoiceRequestInfo from "@/components/peanut-zk-invoices/invoice-info-request";

// import { usePeanut } from "@/hooks/usePeanut";
// import { useToast } from "@bu/ui/use-toast";

// import FulfillRequestLink from "@/components/peanut-zk-invoices/fulfill-request-link";
// import Link from "next/link";

// console.log("linkDetails", linkDetails);

// export default async function InvoiceRequestInfo({
//   linkDetails,
// }: {
//   linkDetails: string;
// }) {
//   const { fulfillRequestLink } = usePeanut();
//   const { toast } = useToast();

//   const fetchRequestDetail = async (linkDetails: string) => {
//     try {
//       const details = await fulfillRequestLink(linkDetails);
//       return details;
//     } catch (error: any) {
//       console.error("Error fetching link details:", error.message);
//       toast({
//         title: "Error",
//         description: "Error fetching link details",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col justify-center items-center min-h-screen dotted-bg p-4 sm:p-6 md:p-0">
//         <div
//           className="flex flex-col w-full max-w-full py-6"
//           style={{ maxWidth: width }}
//         >
//           <div className="pb-24 md:pb-0">
//             <div className="shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)]">
//               <HtmlTemplate
//                 title={`Payment Request - ${tokenSymbol}`}
//                 invoice_number={params.token}
//                 issue_date={new Date().toISOString()}
//                 due_date={new Date().toISOString()}
//                 template={template}
//                 line_items={[
//                   {
//                     name: `Payment in ${tokenSymbol}`,
//                     quantity: 1,
//                     price: parseFloat(tokenAmount) || 0,
//                   },
//                 ]}
//                 currency={tokenSymbol || ""}
//                 amount={parseFloat(tokenAmount) || 0}
//                 token={tokenSymbol || ""}
//                 size={size}
//                 width={width}
//                 height={height}
//                 {...details}
//               />
//             </div>
//           </div>
//         </div>

//         <InvoiceToolbar
//           id={params.token}
//           size={size}
//           customer={payableAddress}
//           viewedAt={new Date().toISOString()}
//         />

//         <FulfillRequestLink
//           link={params.token}
//           amount={tokenAmount}
//           symbol={tokenSymbol}
//         />
//         <div className="fixed bottom-4 right-4 hidden md:block">
//           <Link
//             href="https://defi.bu.finance"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center text-[9px] text-[#878787] hover:text-[#6b6b6b] transition-colors"
//           >
//             Powered by <span className="text-primary ml-1">Bu.fi</span>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
