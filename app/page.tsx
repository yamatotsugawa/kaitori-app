"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function KaitoriCalculator() {
  const [finalAmount, setFinalAmount] = useState("");
  const [pickupCost, setPickupCost] = useState("");
  const [campaign, setCampaign] = useState("");
  const [rate, setRate] = useState(1.2);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const f = Number(finalAmount) || 0;
    const p = Number(pickupCost) || 0;
    const c = Number(campaign) || 0;

    const base = (f + p - c) / rate;
    const subtotal = base - p;
    const upAmount = base * (rate - 1);

    setResult({
      pickup: p,
      base: Math.round(base),
      subtotal: Math.round(subtotal),
      up: Math.round(upAmount),
      campaign: c,
      final: f,
    });
  };

  const addCampaign = (amount) => {
    const current = Number(campaign) || 0;
    setCampaign(current + amount);
  };

  const reset = () => {
    setFinalAmount("");
    setPickupCost("");
    setCampaign("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="max-w-md mx-auto">
        <Card className="rounded-2xl shadow-lg">
          <CardContent className="p-4 space-y-4">
            <h1 className="text-lg font-bold text-center">TSO明細書用計算アプリ</h1>

            <div className="space-y-1">
              <label className="text-sm">アップ率</label>
              <select
                className="w-full border rounded p-3 text-base"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              >
                <option value={1.2}>20%アップ</option>
                <option value={1.22}>22%アップ</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm">最終お渡し金額</label>
              <Input
                inputMode="numeric"
                className="text-lg p-3"
                value={finalAmount}
                onChange={(e) => setFinalAmount(e.target.value)}
                placeholder="30000"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm">有料回収金額</label>
              <Input
                inputMode="numeric"
                className="text-lg p-3"
                value={pickupCost}
                onChange={(e) => setPickupCost(e.target.value)}
                placeholder="30000"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm">キャンペーン</label>
              <Input
                inputMode="numeric"
                className="text-lg p-3"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                placeholder="1000"
              />

              {/* ワンタップボタン（キャンペーン直下に配置） */}
              <div className="flex gap-2">
                <Button className="flex-1" variant="secondary" onClick={() => addCampaign(1000)}>
                  +1000
                </Button>
                <Button className="flex-1" variant="secondary" onClick={() => addCampaign(2000)}>
                  +2000
                </Button>
                <Button className="flex-1" variant="secondary" onClick={() => addCampaign(3000)}>
                  +3000
                </Button>
              </div>
            </div>

            {/* 固定ボタン風 */}
            <div className="flex gap-2">
              <Button className="flex-1 text-lg py-4" onClick={calculate}>
                計算
              </Button>
              <Button className="flex-1 text-lg py-4" variant="destructive" onClick={reset}>
                リセット
              </Button>
            </div>

            {result !== null && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-left mt-4 space-y-2 text-sm"
              >
                <p>・有料回収金額：{result.pickup.toLocaleString()} 円</p>
                <p>・20%アップ前金額：{result.base.toLocaleString()} 円</p>
                <p>・小計（買取額 − 有料回収）：{result.subtotal.toLocaleString()} 円</p>
                <p>・アップ分：{result.up.toLocaleString()} 円</p>
                <p>・キャンペーン：{result.campaign.toLocaleString()} 円</p>
                <p className="font-bold text-lg">・最終お渡し額：{result.final.toLocaleString()} 円</p>
              </motion.div>
            )}
                      <p className="text-xs text-center text-gray-500 mt-4">不具合や要望があれば仙台支店津川までご連絡ください。</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
