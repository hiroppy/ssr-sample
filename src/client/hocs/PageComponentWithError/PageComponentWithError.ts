import { branch, renderComponent, withProps, compose } from 'recompose';
import { NotFound } from '../../components/pages/NotFound';
import { InternalServerError } from '../../components/pages/InternalServerError';

export interface ErrorProps {
  error: Error | null;
}

type BaseProps = ErrorProps & { statusCode: number };

// more verification required
function formatErrorCode(err: Error): number {
  return Number(err.message);
}

// TODO: Errorオブジェクトへ変更したので確認
export const PageComponentWithError = <Props extends ErrorProps>() =>
  compose<Props, Props>(
    withProps((props: Props) => ({
      statusCode: (props.error && formatErrorCode(props.error)) || null
    })),
    branch<BaseProps>(
      (props) => props.statusCode === 401 || props.statusCode === 403 || props.statusCode === 404,
      renderComponent(NotFound)
    ),
    // otherwise
    branch<BaseProps>(
      (props) => !!props.statusCode && props.statusCode === 500,
      renderComponent(InternalServerError)
    )
  );
