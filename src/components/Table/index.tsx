import React from "react";
import { ITableProps } from "./types";
import {
  Container,
  EmptyContainer,
  LabelContainer,
  LabelHeader,
  LabelLine,
  LineContainer,
  TableHeader,
  Title,
  TitleContainer,
} from "./styles";
import accessObjectByString from "@/utils/accessObjectByString";
import { format, parseISO } from "date-fns";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";

const Table = ({ title, columns, data, actions = [], emptyMessage, loading }: ITableProps) => {
  const theme = useTheme();

  return (
    <Container>
      <TitleContainer>{title && <Title>{title}</Title>}</TitleContainer>
      <TableHeader>
        {columns.map((column) => (
          <LabelContainer
            style={{
              justifyContent: column.alignHead ? column.alignHead : "flex-start",
              width: `${100 / (columns.length + actions.length)}%`,
            }}
          >
            <LabelHeader>{column.label}</LabelHeader>
          </LabelContainer>
        ))}
        {actions && (
          <LabelContainer
            style={{
              justifyContent: "center",
              width: `${100 / (columns.length + actions.length)}%`,
            }}
          >
            <LabelHeader>{"Ações"}</LabelHeader>
          </LabelContainer>
        )}
      </TableHeader>

      {loading && !data.length && (
        <LineContainer
          style={{
            backgroundColor: theme.colors.primary?.[0],
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <EmptyContainer>
            <LabelLine>Carregando...</LabelLine>
          </EmptyContainer>
        </LineContainer>
      )}

      {!loading && !data.length && (
        <LineContainer
          style={{
            backgroundColor: theme.colors.primary?.[0],
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}
        >
          <EmptyContainer>
            <LabelLine>{emptyMessage ?? "Nenhum dado encontrado :("} </LabelLine>
          </EmptyContainer>
        </LineContainer>
      )}

      {data.map((row, index) => (
        <LineContainer
          key={row.id}
          style={{
            backgroundColor: index % 2 === 0 ? theme.colors.primary?.[0] : "transparent",
            borderBottomLeftRadius: index === data.length - 1 ? 8 : 0,
            borderBottomRightRadius: index === data.length - 1 ? 8 : 0,
          }}
        >
          {columns.map((column) => {
            switch (column.type) {
              case "string":
                return (
                  <LabelContainer
                    style={{
                      justifyContent: column.alignRow ? column.alignRow : "flex-start",
                      width: `${100 / (columns.length + actions.length)}%`,
                    }}
                  >
                    <LabelLine>
                      {column.format
                        ? column.format(accessObjectByString(row, column.name), row)
                        : accessObjectByString(row, column.name)}
                    </LabelLine>
                  </LabelContainer>
                );

              case "number":
                return (
                  <LabelContainer
                    style={{
                      justifyContent: column.alignRow ? column.alignRow : "flex-start",
                      width: `${100 / (columns.length + actions.length)}%`,
                    }}
                  >
                    <LabelLine>
                      {column.format
                        ? column.format(accessObjectByString(row, column.name), row)
                        : accessObjectByString(row, column.name)}
                    </LabelLine>
                  </LabelContainer>
                );

              case "date":
                return (
                  <LabelContainer
                    style={{
                      justifyContent: column.alignRow ? column.alignRow : "flex-start",
                      width: `${100 / (columns.length + actions.length)}%`,
                    }}
                  >
                    <LabelLine>
                      {column.format
                        ? column.format(accessObjectByString(row, column.name), row)
                        : null}

                      {accessObjectByString(row, column.name) instanceof Date
                        ? format(accessObjectByString(row, column.name), "dd/MM/yyyy")
                        : format(parseISO(accessObjectByString(row, column.name)), "dd/MM/yyyy")}
                    </LabelLine>
                  </LabelContainer>
                );
              case "date-hour":
                return (
                  <LabelContainer
                    style={{
                      justifyContent: column.alignRow ? column.alignRow : "flex-start",
                      width: `${100 / (columns.length + actions.length)}%`,
                    }}
                  >
                    <LabelLine>
                      {column.format
                        ? column.format(accessObjectByString(row, column.name), row)
                        : null}

                      {accessObjectByString(row, column.name) instanceof Date
                        ? format(accessObjectByString(row, column.name), "dd/MM/yyyy HH:mm")
                        : format(
                            parseISO(accessObjectByString(row, column.name)),
                            "dd/MM/yyyy HH:mm",
                          )}
                    </LabelLine>
                  </LabelContainer>
                );

              case "boolean":
                return (
                  <LabelContainer
                    style={{
                      justifyContent: column.alignRow ? column.alignRow : "flex-start",
                      width: `${100 / (columns.length + actions.length)}%`,
                    }}
                  >
                    <LabelLine>
                      {column.format
                        ? column.format(accessObjectByString(row, column.name), row)
                        : accessObjectByString(row, column.name)
                          ? "Ativo"
                          : "Inativo"}
                    </LabelLine>
                  </LabelContainer>
                );
              default:
                return null;
            }
          })}
          {actions && (
            <LabelContainer
              style={{
                justifyContent: "center",
                width: `${100 / (columns.length + actions.length)}%`,
              }}
            >
              {actions.map((action) => (
                <LabelLine>
                  <TouchableOpacity
                    key={action.iconName}
                    onPress={() => action.handler(row)}
                    disabled={action.disabled(row)}
                    style={{
                      opacity: action.disabled(row) ? 0.2 : 1,
                    }}
                  >
                    {action.icon}
                  </TouchableOpacity>
                </LabelLine>
              ))}
            </LabelContainer>
          )}
        </LineContainer>
      ))}
    </Container>
  );
};

export default Table;
