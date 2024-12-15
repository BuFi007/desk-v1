"use client";

import { ArrowUpRight, Wallet2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@bu/ui/card";
import { Button } from "@bu/ui/button";
import { motion } from "framer-motion";

export function LoanCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-300">
        <motion.div
          className="absolute inset-0 bg-grid-white/10"
          style={{
            maskImage: "linear-gradient(0deg,white,rgba(255,255,255,0.5))",
          }}
          animate={{
            backgroundPosition: ["0px 0px", "0px -32px"],
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "linear",
          }}
        />
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_120px] lg:gap-8">
            <div className="h-32 rounded-lg bg-gray-200">
              <motion.div
                className="flex items-center gap-2 text-white/80"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Wallet2 className="h-5 w-5" />
                <span className="text-sm font-medium">DeFi Money Market</span>
              </motion.div>
              <motion.h3
                className="mt-4 text-3xl font-bold text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Get instant loans backed by your invoices
              </motion.h3>
              <motion.p
                className="mt-2 text-white/90"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Access competitive rates in our decentralized money market
                protocol
              </motion.p>
            </div>
            <div className="h-32 rounded-lg bg-gray-200"></div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="group bg-white/20 text-white hover:bg-white/30"
              size="lg"
            >
              <a
                href="https://defi.bu.finance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Explore Lending
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
