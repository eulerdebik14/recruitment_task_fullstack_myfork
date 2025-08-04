<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpClient\HttpClient;

class ExchangeRateController extends AbstractController
{
    #[Route('/api/rates/today', name: 'get_today_rates', methods: ['GET'])]
    public function getTodayRates(): JsonResponse
    {
        return $this->fetchRatesForDate(new \DateTime());
    }

    #[Route('/api/rates/history', name: 'get_rates_history', methods: ['GET'])]
    public function getRatesHistory(Request $request): JsonResponse
    {
        $dateParam = $request->query->get('date');
        try {
            $endDate = $dateParam ? new \DateTime($dateParam) : new \DateTime();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Invalid date format'], 400);
        }

        $client = HttpClient::create();
        $currencies = ['EUR', 'USD', 'CZK', 'IDR', 'BRL'];
        $result = [];

        for ($i = 0; $i < 14; $i++) {
            $date = clone $endDate;
            $date->modify("-$i day");
            $formatted = $date->format('Y-m-d');

            $url = 'https://api.nbp.pl/api/exchangerates/tables/A/' . $formatted . '?format=json';

            try {
                $response = $client->request('GET', $url);
                $data = $response->toArray();
            } catch (\Exception $e) {
                // In case of missing data in weekend day(for example sunday), we skip this step
                continue;
            }

            $ratesTable = $data[0]['rates'];
            $dayRates = [];

            foreach ($currencies as $currency) {
                $rateData = array_filter($ratesTable, fn($r) => $r['code'] === $currency);
                if (count($rateData) === 0) continue;

                $rateData = array_values($rateData)[0];
                $mid = $rateData['mid'];

                if (in_array($currency, ['EUR', 'USD'])) {
                    $buy = $mid - 0.15;
                    $sell = $mid + 0.11;
                } else {
                    $buy = null;
                    $sell = $mid + 0.2;
                }

                $dayRates[] = [
                    'currency' => $currency,
                    'date' => $formatted,
                    'buy' => $buy,
                    'sell' => $sell,
                    'mid' => $mid
                ];
            }

            $result[] = [
                'date' => $formatted,
                'rates' => $dayRates
            ];
        }

        return new JsonResponse($result);
    }

    private function fetchRatesForDate(\DateTime $date): JsonResponse
    {
        $currencies = ['EUR', 'USD', 'CZK', 'IDR', 'BRL'];
        $url = 'https://api.nbp.pl/api/exchangerates/tables/A/' . $date->format('Y-m-d') . '?format=json';

        $client = HttpClient::create();
        try {
            $response = $client->request('GET', $url);
            $data = $response->toArray();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'No data available for this date'], 404);
        }

        $ratesTable = $data[0]['rates'];
        $result = [];

        foreach ($currencies as $currency) {
            $rateData = array_filter($ratesTable, fn($r) => $r['code'] === $currency);
            if (count($rateData) === 0) continue;

            $rateData = array_values($rateData)[0];
            $mid = $rateData['mid'];

            if (in_array($currency, ['EUR', 'USD'])) {
                $buy = $mid - 0.15;
                $sell = $mid + 0.11;
            } else {
                $buy = null;
                $sell = $mid + 0.2;
            }

            $result[] = [
                'currency' => $currency,
                'buy' => $buy,
                'sell' => $sell,
                'mid' => $mid
            ];
        }

        return new JsonResponse($result);
    }
}