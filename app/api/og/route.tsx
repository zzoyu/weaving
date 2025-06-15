import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const description = searchParams.get('description');
    const thumbnail = searchParams.get('thumbnail');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: '8px 16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt={name || ''}
                style={{
                  width: '240px',
                  height: '240px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                maxWidth: '480px',
              }}
            >
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  margin: 0,
                  lineHeight: '1.2',
                }}
              >
                {name}
              </h1>
              {description && (
                <p
                  style={{
                    fontSize: '28px',
                    color: '#666666',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
      },
    );
  } catch (e: unknown) {
    console.log(`${e instanceof Error ? e.message : 'Unknown error'}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 