import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

const tracerExporter = new OTLPTraceExporter({
  url:
    process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT ||
    'http://38.242.236.239:4318/v1/traces',
});

const prometheusExporter = new PrometheusExporter({
  port: 9464, // porta padrão que o Prometheus vai scrapar
  endpoint: '/metrics', // rota exposta
});

const sdk = new NodeSDK({
  traceExporter: tracerExporter,
  metricReaders: [prometheusExporter],
  instrumentations: [
    new NestInstrumentation(),
    new HttpInstrumentation(), // opcional, mas útil
    new PrismaInstrumentation(),
  ],
  serviceName: 'meu-servico-nest',
});

sdk.start();
